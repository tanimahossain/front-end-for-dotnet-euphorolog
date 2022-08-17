import axios from 'axios';
import React, { Component } from 'react';
import { Link, Navigate } from 'react-router-dom';
import '../App.css';
import '../styles/Profile.css';
import AllContext from './AllContext';
export default class UserButtons extends Component {
    static contextType = AllContext;
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            doRedirect: false,
        };
    }
    handleDeleteChange = async () => {
        const { LogOut, setAlert, setRedirect } =
            this.context;
        const user = {};
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem(
                    'token',
                    false
                )}`,
            },
        };
        const baseUrl = '/api/v1/users/';
        //const navigate = useNavigate();
        try {
            setAlert('loading', true);
            await axios.delete(baseUrl, config, user);
            LogOut();
            alert('User deleted!');
            setAlert('loading', false);

            setRedirect(true);
        } catch (err) {
            if (err.response.status === 401) {
                LogOut();
            }
            if (err.response.status !== 404) {
                alert(err);
            }
            //console.log(err);
        }
    };
    navigate = () => {
        const { doRedirect, setRedirect } = this.context;
        if (doRedirect) {
            setRedirect(false);
            return <Navigate to="/" />;
        }
    };
    render() {
        const {
            isLoggedIn,
            userName,
            doRedirect,
            setRedirect,
        } = this.context;
        const { user } = this.props;
        console.log(user, userName);
        if (!isLoggedIn) return;
        if (userName !== this.props.user.userName) return;
        () => this.navigate();
        if (doRedirect) {
            setRedirect(false);
            return <Navigate to="/" />;
        }
        return (
            <>
                <div>
                    <Link to="/stories/">
                        <button className="CreateStorybtn">
                            Create Story
                        </button>
                    </Link>
                    <Link to="/users/">
                        <button className="UpdateUserbtn">
                            Update User
                        </button>
                    </Link>
                    <button
                        className="DeleteUserbtn"
                        onClick={this.handleDeleteChange}
                    >
                        Delete User
                    </button>
                </div>
            </>
        );
    }
}
