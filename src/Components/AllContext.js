import axios from 'axios';
import React, { Component } from 'react';
const AllContext = React.createContext();

export class AllProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            successAlert: '',
            errorAlert: '',
            doRedirect: false,
            isLoggedIn: localStorage.getItem('isLoggedIn'),
            userName: localStorage.getItem('userName'),
            token: localStorage.getItem('token'),
            storyIds: [],
        };
    }
    setRedirect = (val) => {
        this.setState({
            doRedirect: val,
        });
    };
    LogOut = () => {
        localStorage.removeItem('userName');
        localStorage.removeItem('token');
        localStorage.removeItem('isLoggedIn');
        this.setState({
            isLoggedIn: false,
            userName: '',
            token: '',
        });
    };
    setAuth = (flag, uname, jwtToken) => {
        localStorage.setItem('isLoggedIn', flag);
        localStorage.setItem('token', jwtToken);
        localStorage.setItem('userName', uname);
        this.setState({
            isLoggedIn: flag,
            userName: uname,
            token: jwtToken,
        });
    };
    setAlert = (name, value) => {
        if (name === 'loading') {
            this.setState({
                isLoading: value,
            });
        } else if (name === 'success') {
            this.setState({
                successAlert: value,
            });
        } else {
            this.setState({
                errorAlert: value,
            });
        }
    };
    getAlert = (name) => {
        if (name === 'loading') {
            return this.state.isLoading;
        } else if (name === 'success') {
            return this.state.successAlert;
        } else {
            return this.state.errorAlert;
        }
    };
    async componentDidMount() {
        const user = {};
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem(
                    'token',
                    false
                )}`,
            },
        };
        const baseUrl = '/api/v1/users/verify';
        try {
            this.setAlert('loading', true);
            this.setState({ error: '' });
            const response = await axios.post(
                baseUrl,
                user,
                config
            );
            this.setAuth(
                true,
                response.data.userName,
                response.data.token
            );
            this.setAlert('loading', false);
        } catch (err) {
            if (err.response.status === 401) {
                this.LogOut();
            }
        }
        this.setAlert('loading', false);
    }
    render() {
        const {
            isLoading,
            successAlert,
            errorAlert,
            isLoggedIn,
            userName,
            token,
            doRedirect,
            storyIds,
        } = this.state;
        const {
            setAlert,
            getAlert,
            LogOut,
            setAuth,
            setRedirect,
        } = this;
        return (
            <AllContext.Provider
                value={{
                    isLoading,
                    successAlert,
                    errorAlert,
                    isLoggedIn,
                    userName,
                    token,
                    doRedirect,
                    storyIds,
                    setAlert,
                    getAlert,
                    setAuth,
                    LogOut,
                    setRedirect,
                }}
            >
                {this.props.children}
            </AllContext.Provider>
        );
    }
}
export default AllContext;
