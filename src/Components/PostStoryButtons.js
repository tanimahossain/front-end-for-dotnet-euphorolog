import axios from 'axios';
import React, { Component } from 'react';
import { Link, Navigate } from 'react-router-dom';
import '../App.css';
import '../styles/Story.css';
export default class PostStoryButtons extends Component {
    constructor(props) {
        super(props);
        //console.log(props);
        this.state = {
            storyTitle: '',
            storyDescription: '',
            doRedirect: '',
        };
    }
    handleFieldChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };
    handleUpdateChange = async (event) => {
        event.preventDefault();
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
        //const navigate = useNavigate();
        axios.defaults.headers = {
            'Cache-Control': 'no-cache',
            Pragma: 'no-cache',
            Expires: '0',
        };
        try {
            const response = await axios.post(
                baseUrl,
                story,
                config
            );
            this.setState({
                doRedirect:
                    '/stories/' + response.data.storyId,
            });
            console.log(this.state.doRedirect);
        } catch (err) {
            //
        }
    };
    render() {
        const baseUrl = localStorage.getItem('loggedIn')
            ? '/users/' + localStorage.getItem('userName')
            : '/homepage';
        if (this.state.doRedirect) {
            return <Navigate to={this.state.doRedirect} />;
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
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}