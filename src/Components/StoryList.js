import axios from 'axios';
import { Component } from 'react';
import { Navigate } from 'react-router-dom';
import '../App.css';
import AllContext from './AllContext';
import PrintStories from './PrintStories.js';
class Stories extends Component {
    static contextType = AllContext;
    constructor(props) {
        super(props);
        this.state = {
            stories: [],
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
                stories: List,
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
        const { doRedirect, setRedirect } = this.context;
        if (doRedirect) {
            setRedirect(false);
            return <Navigate to="/" />;
        }
    };
    render() {
        const { stories } = this.state;
        const indexOfLastPost =
            this.state.currentPage *
            this.state.storiesPerPage;
        const indexOfFirstPost =
            indexOfLastPost - this.state.storiesPerPage;
        const Stories = stories.slice(
            indexOfFirstPost,
            indexOfLastPost
        );
        () => this.navigate();
        const { doRedirect, setRedirect } = this.context;
        if (doRedirect) {
            setRedirect(false);
            return <Navigate to="/" />;
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

export default Stories;
