import axios from 'axios';
import React, { Component } from 'react';
import { Link, Navigate } from 'react-router-dom';
import '../App.css';
import '../styles/Story.css';
import AllContext from './AllContext';
import ErrorAlert from './ErrorAlert';
export default class PostStoryButtons extends Component {
    static contextType = AllContext;
    constructor(props) {
        super(props);
        this.state = {
            storyTitle: '',
            storyDescription: '',
            loading: false,
            doRedirect: false,
            error: '',
            url: '',
        };
    }
    ResetError = () => {
        this.setState({
            error: '',
        });
    };
    handleFieldChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };
    handleUpdateChange = async (event) => {
        event.preventDefault();
        const { setAlert, setRedirect, LogOut } =
            this.context;
        const story = {
            storyTitle: this.state.storyTitle,
            storyDescription: this.state.storyDescription,
        };
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem(
                    'token'
                )}`,
            },
        };
        const baseUrl = '/api/v1/stories/';
        try {
            setAlert('loading', true);
            const response = await axios.post(
                baseUrl,
                story,
                config
            );
            this.setState({
                url: '/stories/' + response.data.storyId,
            });
            setRedirect(true);
        } catch (err) {
            if (err.response.status === 401) {
                LogOut();
            } else if (err.response.status !== 404) {
                this.setState({
                    error: err.response.data.message,
                });
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
        const baseUrl = isLoggedIn
            ? '/users/' + userName
            : '/homepage';
        if (doRedirect) {
            setRedirect(false);
            return <Navigate to={this.state.url} />;
        }
        console.log(isLoggedIn);
        if (!isLoggedIn) {
            return <Navigate to="/" />;
        }
        return (
            <div className="container">
                <div className="storyDetails">
                    <div className="story-info">
                        <form
                            onSubmit={
                                this.handleUpdateChange
                            }
                        >
                            Story Title
                            <textarea
                                placeholder="Story Title..."
                                name="storyTitle"
                                className="editStoryTitle"
                                onChange={
                                    this.handleFieldChange
                                }
                                wrap="hard"
                                required
                            />
                            Story
                            <textarea
                                type="text"
                                placeholder="Story Description...."
                                name="storyDescription"
                                className="editStoryBody"
                                onChange={
                                    this.handleFieldChange
                                }
                                wrap="hard"
                                required
                            />
                            <Link to={baseUrl}>
                                <button className="Cancelbtn">
                                    Cancel
                                </button>
                            </Link>
                            <button className="UpdateStorybtn">
                                Post Story
                            </button>
                            <ErrorAlert
                                error={this.state.error}
                                ResetError={this.ResetError}
                            />
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
