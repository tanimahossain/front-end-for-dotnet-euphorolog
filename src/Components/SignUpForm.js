import axios from 'axios';
import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import '../App.css';
import '../styles/InputText.css';
import AllContext from './AllContext';
import ErrorAlert from './ErrorAlert';
export default class SignUp extends Component {
    static contextType = AllContext;
    constructor(props) {
        super(props);

        this.state = {
            userName: '',
            fullName: '',
            eMail: '',
            password: '',
            confirmPassword: '',
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
        const { password, confirmPassword } = this.state;
        console.log('pre post');
        if (password !== confirmPassword) {
            this.setState({
                error: "Passwords doesn't match each other",
            });
            return;
        }
        const user = {
            userName: this.state.userName,
            fullName: this.state.fullName,
            eMail: this.state.eMail,
            password: password,
        };
        const baseUrl = '/api/v1/users/';
        const { setAlert, setRedirect, setAuth } =
            this.context;
        try {
            setAlert('loading', true);
            this.setState({
                error: '',
            });
            console.log('pre post');
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
            alert('User Created Succesfully');
        } catch (err) {
            console.log('err', err);
            if (err.response.status !== 404) {
                this.setState({
                    error: err.response.data.message,
                });
            }
        }
        setAlert('loading', false);
    };
    render() {
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
                        className="form-control"
                        placeholder="Username"
                        value={this.state.userName}
                        name="userName"
                        onChange={this.handleFieldChange}
                    />
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Full Name"
                        value={this.state.fullName}
                        name="fullName"
                        onChange={this.handleFieldChange}
                    />
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Enter email"
                        value={this.state.eMail}
                        name="eMail"
                        onChange={this.handleFieldChange}
                    />
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Enter password"
                        value={this.state.password}
                        name="password"
                        onChange={this.handleFieldChange}
                    />
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Confirm password"
                        value={this.state.confirmPassword}
                        name="confirmPassword"
                        onChange={this.handleFieldChange}
                    />
                    <button type="submit">Sign Up</button>

                    <ErrorAlert
                        error={this.state.error}
                        ResetError={this.ResetError}
                    />
                </form>
            </>
        );
    }
}
