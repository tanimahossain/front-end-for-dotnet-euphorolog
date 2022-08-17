import axios from 'axios';
import React, { Component } from 'react';
//import { Navigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import '../App.css';
import UserButtons from '../Components/UserButtons.js';
import UserFullName from '../Components/UserFullName.js';
import '../styles/Profile.css';
import AllContext from './AllContext';

function PrintAUser(props) {
    return (
        <div className="container bottonBorder">
            <div className="userDetails">
                <div className="user">
                    <div className="user-preview">
                        <div className="story-info">
                            <UserFullName
                                user={props.user}
                            />
                        </div>
                    </div>
                    <UserButtons user={props.user} />
                </div>
            </div>
        </div>
    );
}

class Profile extends Component {
    static contextType = AllContext;
    constructor(props) {
        super(props);
        this.state = {
            ViewList: {},
            userId: props.userId,
            doRedirect: false,
            error: '',
            loading: false,
        };
    }
    async componentDidMount() {
        const { setAlert, LogOut } = this.context;
        const baseUrl =
            '/api/v1/users/' + this.state.userId;
        setAlert('loading', true);
        try {
            const response = await axios.get(baseUrl);
            this.setState({
                ViewList: response.data.userData,
            });
        } catch (err) {
            if (err.response.status === 401) {
                LogOut();
            }
            if (err.response.status !== 404) {
                alert(err);
            }
            this.setState({
                doRedirect: true,
            });
        }
        setAlert('loading', false);
    }
    render() {
        const { ViewList } = this.state;
        if (this.state.doRedirect) {
            this.setState({
                doRedirect: false,
            });
            return <Navigate to="/" />;
        }
        return (
            <>
                <PrintAUser user={ViewList} />
            </>
        );
    }
}
export default Profile;
