import axios from 'axios';
import React, { Component } from 'react';
import { Link, Navigate } from 'react-router-dom';
import '../App.css';
import '../styles/Profile.css';
import AllContext from './AllContext';
import ErrorAlert from './ErrorAlert.js';
export default class PostStoryButtons extends Component {
    static contextType = AllContext;
    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            password: '',
            confirm: '',
            error: '',
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
        const { password, confirmPassword } = this.state;
        const {
            setAlert,
            setAuth,
            token,
            userName,
            setRedirect,
            LogOut,
        } = this.context;
        event.preventDefault();
        this.setState({
            error: '',
        });
        if (password && password !== confirmPassword) {
            this.setState({
                error: "Passwords doesn't match each other",
            });
            return;
        }
        if (
            (password && !confirmPassword) ||
            (!password && confirmPassword)
        ) {
            this.setState({
                error: "Passwords doesn't match each other",
            });
            return;
        }
        let story = {};
        if (this.state.fullName) {
            story = {
                fullName: this.state.fullName,
            };
        }
        if (password) story.password = password;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const baseUrl = '/api/v1/users/';
        try {
            setAlert('loading', true);
            const response = await axios.put(
                baseUrl,
                story,
                config
            );
            if (response.data.token) {
                setAuth(
                    true,
                    userName,
                    response.data.token
                );
            }
            setRedirect(true);
        } catch (err) {
            if (err.response.status === 401) {
                LogOut();
            }
            if (err.response.status !== 404) {
                this.setState({
                    error: err.response.data.message,
                });
            }
        }
        setAlert('loading', false);
    };
    navigate = () => {
        const {
            doRedirect,
            isLoggedIn,
            userName,
            setRedirect,
        } = this.context;
        const baseUrl = isLoggedIn
            ? '/users/' + userName
            : '/homepage';
        if (doRedirect) {
            setRedirect(false);
            return <Navigate to={baseUrl} />;
        }
        if (!isLoggedIn) {
            return <Navigate to="/" />;
        }
    };
    render() {
        const {
            doRedirect,
            isLoggedIn,
            userName,
            setRedirect,
        } = this.context;
        const baseUrl = isLoggedIn
            ? '/users/' + userName
            : '/homepage';
        () => this.navigate();
        if (doRedirect) {
            setRedirect(false);
            return <Navigate to={baseUrl} />;
        }
        if (!isLoggedIn) {
            return <Navigate to="/" />;
        }
        return (
            <>
                <div className="container">
                    <div className="storyDetails">
                        <div className="story-info">
                            <form
                                onSubmit={
                                    this.handleUpdateChange
                                }
                            >
                                <label>
                                    Change Full Name
                                </label>
                                <textarea
                                    type="text"
                                    placeholder="Full Name"
                                    name="fullName"
                                    className="userUpdateInputBox"
                                    onChange={
                                        this
                                            .handleFieldChange
                                    }
                                    wrap="hard"
                                />
                                <label>
                                    Change Password
                                </label>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    className="userUpdateInputBox"
                                    onChange={
                                        this
                                            .handleFieldChange
                                    }
                                    wrap="hard"
                                />
                                <input
                                    type="password"
                                    placeholder="Confirm Password"
                                    name="confirmPassword"
                                    className="userUpdateInputBox"
                                    onChange={
                                        this
                                            .handleFieldChange
                                    }
                                    wrap="hard"
                                />
                                <Link to={baseUrl}>
                                    <button className="Cancelbtn">
                                        Cancel
                                    </button>
                                </Link>
                                <button className="UpdateStorybtn">
                                    Update User
                                </button>
                                <ErrorAlert
                                    error={this.state.error}
                                    ResetError={
                                        this.ResetError
                                    }
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
