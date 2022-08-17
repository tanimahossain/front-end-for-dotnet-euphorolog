import axios from 'axios';
import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import '../App.css';
import StoryButtons from '../Components/StoryButtons.js';
import UpdateFullStory from '../Components/UpdateFullStory.js';
import GetDate from '../utils/DateFormat';
import AllContext from './AllContext';
import StoryTitle from './StoryTitle.js';

function PrintAStory(props) {
    console.log(props.setMyStoryEdit.toString());
    return (
        <div className="container">
            <div className="storyDetails">
                <div className="story-info">
                    <StoryTitle
                        story={props.story}
                        flag={true}
                    />
                    <div className="storyDate-text">
                        Created at: &emsp;&emsp;&ensp;
                        <GetDate
                            date={props.story.createdAt}
                        />
                        Last Updated at:{' '}
                        <GetDate
                            date={props.story.updatedAt}
                        />
                    </div>
                    <div className="storyBody">
                        {props.story.storyDescription}
                    </div>
                    <StoryButtons
                        story={props.story}
                        storyId={props.story.storyId}
                        userName={
                            props.story.authorUsername
                        }
                        setMyStoryEdit={
                            props.setMyStoryEdit
                        }
                    />
                </div>
            </div>
        </div>
    );
}
class FullStory extends Component {
    static contextType = AllContext;
    constructor(props) {
        super(props);
        //console.log(props);
        this.state = {
            ViewList: {},
            storyId: props.storyId,
            error: '',
            myStoryEdit: false,
        };
    }
    setMyStoryEdit = (val) => {
        this.setState({
            myStoryEdit: val,
        });
    };
    async componentDidMount() {
        const { setRedirect, setAlert, LogOut } =
            this.context;
        const baseUrl =
            '/api/v1/stories/' + this.state.storyId;
        setAlert('loading', true);
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
                alert(err.response.data.message);
            }
            setRedirect(true);
        }
        setAlert('loading', false);
    }
    render() {
        const { doRedirect, setRedirect } = this.context;
        const { ViewList } = this.state;
        if (doRedirect) {
            setRedirect(false);
            return <Navigate to="/" />;
        } else
            return (
                <>
                    {!this.state.myStoryEdit && (
                        <PrintAStory
                            story={ViewList}
                            setMyStoryEdit={
                                this.setMyStoryEdit
                            }
                        />
                    )}
                    {this.state.myStoryEdit && (
                        <UpdateFullStory
                            storyId={this.props.storyId}
                            setMyStoryEdit={
                                this.setMyStoryEdit
                            }
                        />
                    )}
                </>
            );
    }
}
export default FullStory;
