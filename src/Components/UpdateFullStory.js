import axios from 'axios';
import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import '../App.css';
import StoryUpdateButtons from '../Components/StoryUpdateButtons.js';
import '../styles/Story.css';
import AllContext from './AllContext';
function PrintAStory(props) {
    return (
        <div className="container">
            <div className="storyDetails">
                <div className="story-info">
                    <StoryUpdateButtons
                        story={props.story}
                        storyId={props.storyId}
                        setMyStoryEdit={
                            props.setMyStoryEdit
                        }
                    />
                </div>
            </div>
        </div>
    );
}

class UpdateFullStory extends Component {
    static contextType = AllContext;
    constructor(props) {
        super(props);
        this.state = {
            ViewList: {},
            storyId: props.storyId,
        };
    }
    async componentDidMount() {
        const {
            setAlert,
            setRedirect,
            doRedirect,
            LogOut,
        } = this.context;
        const baseUrl =
            '/api/v1/stories/' + this.state.storyId;
        setAlert('loading', true);
        console.log(doRedirect);
        try {
            const response = await axios.get(baseUrl);
            this.setState({
                ViewList: response.data.storyData,
            });
        } catch (err) {
            if (err.response.status === 401) {
                LogOut();
            }
            if (err.response.status !== 404) {
                alert(err);
            }
            setRedirect(true);
        }
        setAlert('loading', false);
    }
    render() {
        const { ViewList } = this.state;
        const { setRedirect, doRedirect } = this.context;
        if (doRedirect) {
            setRedirect(false);
            const baseUrl =
                '/stories/' + this.props.storyId;
            return <Navigate to={baseUrl} />;
        }
        return (
            <>
                <PrintAStory
                    story={ViewList}
                    storyId={this.props.storyId}
                    setMyStoryEdit={
                        this.props.setMyStoryEdit
                    }
                />
            </>
        );
    }
}
export default UpdateFullStory;
