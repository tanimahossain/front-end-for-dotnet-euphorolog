//import SignUpForm from '../Components/SignUpForm.js';
import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AllContext from '../Components/AllContext.js';
import LogInForm from '../Components/LogInForm.js';
//import Navbar from '../Components/Navbar.js';
import SignUpForm from '../Components/SignUpForm.js';
import '../styles/SignUp.css';

export default class SignUp extends Component {
    static contextType = AllContext;
    constructor(props) {
        super(props);
        this.state = {
            signUp: '',
            logIn: '',
        };
    }
    SetError = (val, field) => {
        if (field == 'logIn') {
            this.setState({
                logIn: val,
            });
        } else {
            this.setState({
                signUp: val,
            });
        }
        console.log(this.state.logIn, this.state.signUp);
    };
    render() {
        if (localStorage.getItem('errorAlert')) {
            toast.error(localStorage.getItem('errorAlert'));
            localStorage.removeItem('errorAlert');
        }
        console.log(this.context);
        const { isLoggedIn } = this.context;
        if (isLoggedIn) {
            return <Navigate to="/" />;
        }
        return (
            <>
                <div className="SignUpLogInBox">
                    <div className="sideBorder">
                        <div className="wrapSignUpLogIn">
                            <h3 className="boxTitle">
                                Sign Up
                            </h3>
                            <SignUpForm
                                error={this.state.signUp}
                                SetError={this.SetError}
                            />
                        </div>
                    </div>
                    <div>
                        <div className="wrapSignUpLogIn">
                            <h3 className="boxTitle">
                                Log In
                            </h3>
                            <LogInForm
                                error={this.state.logIn}
                                SetError={this.SetError}
                                setAuth={this.props.setAuth}
                            />
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
SignUp.contextType = AllContext;
