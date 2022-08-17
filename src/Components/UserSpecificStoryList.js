import axios from 'axios';
import React, { Component } from 'react';
import '../App.css';
import AllContext from './AllContext';
import PrintStories from './PrintStories.js';
class UserSpecificStoryList extends Component {
    static contextType = AllContext;
    constructor(props) {
        super(props);
        this.state = {
            ViewList: [],
            userName: props.userName,
            currentPage: 1,
            storiesPerPage: 5,
        };
    }
    async componentDidMount() {
        const { setAlert, setRedirect, LogOut } =
            this.context;
        setAlert('loading', true);
        try {
            const response = await axios.get(
                '/api/v1/stories/'
            );
            const List = response.data.storyData;
            List.sort(function (a, b) {
                return (
                    new Date(b.createdAt) -
                    new Date(a.createdAt)
                );
            });
            this.setState({
                ViewList: List,
            });
        } catch (err) {
            if (err.response.status === 401) {
                LogOut();
            }
            if (err.response.status !== 404) {
                alert(err);
            }
            setRedirect(true);
        }
        setAlert('loading', false);
    }
    Paginate = (page) => {
        this.setState({
            currentPage: page,
        });
    };

    navigate = () => {
        const { doRedirect } = this.context;
        if (doRedirect) {
            window.open('/', '_self');
            //setRedirect(false);
            //return <Navigate to="/" />;
        }
    };
    render() {
        const { ViewList } = this.state;
        const stories = [];
        for (let i = 0; i < ViewList.length; i++) {
            if (
                ViewList[i].authorUsername !=
                this.state.userName
            )
                continue;
            stories.push(ViewList[i]);
        }
        const indexOfLastPost =
            this.state.currentPage *
            this.state.storiesPerPage;
        const indexOfFirstPost =
            indexOfLastPost - this.state.storiesPerPage;
        const Stories = stories.slice(
            indexOfFirstPost,
            indexOfLastPost
        );
        const { doRedirect } = this.context;
        () => this.navigate();

        if (doRedirect) {
            window.open('/', '_self');
            //setRedirect(false);
            //return <Navigate to="/" />;
        }
        return (
            <>
                <PrintStories
                    currentPage={this.state.currentPage}
                    data={Stories}
                    Paginate={this.Paginate}
                    mx={Math.ceil(
                        stories.length /
                            this.state.storiesPerPage
                    )}
                />
            </>
        );
    }
}
export default UserSpecificStoryList;
