//import Navbar from '../Components/Navbar.js';
//import SignUpForm from '../Components/SignUpForm.js';
import axios from 'axios';
import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import '../App.css';
import '../styles/InputText.css';
import AllContext from './AllContext';
import ErrorAlert from './ErrorAlert';
export default class LogIn extends Component {
    static contextType = AllContext;
    constructor(props) {
        super(props);

        this.state = {
            userName: '',
            password: '',
            loading: false,
            doRedirect: false,
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
    handleSubmitChange = async (event) => {
        event.preventDefault();
        const user = {
            userName: this.state.userName,
            password: this.state.password,
        };
        const baseUrl = '/api/v1/users/logIn';
        const { setAlert, setRedirect, setAuth } =
            this.context;
        try {
            setAlert('loading', true);
            this.setState({ error: '' });
            const response = await axios.post(
                baseUrl,
                user
            );
            setRedirect(true);
            setAuth(
                true,
                response.data.userName,
                response.data.token
            );
        } catch (err) {
            this.setState({
                error: err.response.data.message,
            });
        }
        setAlert('loading', false);
    };
    navigate = () => {
        const { doRedirect, setRedirect } = this.context;
        if (doRedirect) {
            setRedirect(false);
            return <Navigate to="/" />;
        }
    };
    render() {
        () => this.navigate();
        const { doRedirect, setRedirect } = this.context;
        if (doRedirect) {
            setRedirect(false);
            return <Navigate to="/" />;
        }
        return (
            <>
                <form onSubmit={this.handleSubmitChange}>
                    <input
                        required
                        type="text"
                        placeholder="Username"
                        name="userName"
                        onChange={this.handleFieldChange}
                    />

                    <input
                        required
                        type="password"
                        placeholder="Enter password"
                        value={this.state.password}
                        name="password"
                        onChange={this.handleFieldChange}
                    />
                    <button type="submit">Log In</button>
                </form>
                <ErrorAlert
                    error={this.state.error}
                    ResetError={this.ResetError}
                />
            </>
        );
    }
}
