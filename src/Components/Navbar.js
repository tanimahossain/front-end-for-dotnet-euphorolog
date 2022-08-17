import React, { Component } from 'react';
import {
    AiOutlineLogin,
    AiOutlineLogout,
    // eslint-disable-next-line prettier/prettier
    AiOutlineUser
} from 'react-icons/ai';
import { Link, Navigate, NavLink } from 'react-router-dom';
import '../App.css';
import logo from '../appLogo - Copy.png';
import AllContext from './AllContext';
function SignUpLogIn() {
    return (
        <Link to="/auth" className="navSignUpLogIn">
            <span className="icon">
                <AiOutlineUser />
            </span>
            SignUp/
            <span className="icon">
                <AiOutlineLogin />
            </span>
            LogIn
        </Link>
    );
}
function User({ userName, LogOut }) {
    const url = '/users/' + userName;
    return (
        <>
            <NavLink
                as={Link}
                to="/auth/"
                className="navSignUpLogIn"
                onClick={LogOut}
            >
                <span className="icon">
                    <AiOutlineLogout />
                </span>
                LogOut
            </NavLink>
            <NavLink
                as={Link}
                to={url}
                className="navSignUpLogIn"
                onClick={<Navigate to={url} />}
            >
                <span className="icon">
                    <AiOutlineUser />
                </span>
                {userName}
            </NavLink>
        </>
    );
}
export default class Navbar extends Component {
    static contextType = AllContext;
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: localStorage.getItem('isLoggedIn'),
            userName: localStorage.getItem('userName'),
            loading: false,
            doRedirect: false,
            error: '',
        };
    }
    componentDidMount() {
        if (localStorage.getItem('isLoggedIn')) {
            this.setState({
                loggedIn: true,
                userName: localStorage.getItem('userName'),
            });
        } else {
            this.setState({
                loggedIn: false,
                userName: '',
                doRedirect: true,
            });
        }
    }
    render() {
        const { isLoggedIn, userName, LogOut } =
            this.context;
        const auth = isLoggedIn ? (
            <User userName={userName} LogOut={LogOut} />
        ) : (
            <SignUpLogIn />
        );
        return (
            <div>
                <nav>
                    <Link to="/" className="appLogoWrap">
                        <img src={logo} />
                        <span className="appLogo">
                            Euphorolog
                        </span>
                    </Link>
                    {auth}
                </nav>
            </div>
        );
    }
}
