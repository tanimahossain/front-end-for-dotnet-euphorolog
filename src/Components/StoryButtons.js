import axios from 'axios';
import React, { Component } from 'react';
import '../App.css';
import '../styles/Story.css';
import AllContext from './AllContext';
export default class StoryButtons extends Component {
    static contextType = AllContext;
    constructor(props) {
        super(props);
        this.state = {
            ViewList: {},
            storyId: this.props.storyId,
        };
    }
    handleDeleteChange = async () => {
        const story = {};
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem(
                    'token',
                    false
                )}`,
            },
        };
        const { LogOut, setRedirect, setAlert } =
            this.context;
        const baseUrl =
            '/api/v1/stories/' + this.props.storyId;
        setAlert('loading', true);
        try {
            await axios.delete(baseUrl, config, story);
            alert('story deleted!');
            setRedirect(true);
        } catch (err) {
            if (err.response.status === 401) {
                LogOut();
            }
            if (err.response.status !== 404) {
                alert(err);
            }
        }
        setAlert('loading', false);
    };
    render() {
        const {
            isLoggedIn,
            userName,
            doRedirect,
            setRedirect,
        } = this.context;
        if (!isLoggedIn || userName !== this.props.userName)
            return;
        if (doRedirect) {
            setRedirect(false);
            return <Navigate to="/" />;
        }
        console.log(this.props.setMyStoryEdit.toString());
        const { setMyStoryEdit } = this.props;
        return (
            <>
                <button
                    className="DeleteStorybtn"
                    onClick={this.handleDeleteChange}
                >
                    Delete Story
                </button>
                <button
                    className="UpdateStorybtn"
                    onClick={() => setMyStoryEdit(true)}
                >
                    Update Story
                </button>
            </>
        );
    }
}
