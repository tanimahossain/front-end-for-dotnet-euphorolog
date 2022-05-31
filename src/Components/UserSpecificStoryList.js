import axios from 'axios';
import React, { Component } from 'react';
import '../App.css';
import Story from './Story';

function PrintStories(props) {
    const List = props.data;
    List.sort(function (a, b) {
        return (
            new Date(b.createdAt) - new Date(a.createdAt)
        );
    });
    const ViewList = List.map((eStory) => (
        <Story key={eStory.storyId} story={eStory} />
    ));
    return <div className="FlexStoryList">{ViewList}</div>;
}

class UserSpecificStoryList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ViewList: [],
            userName: props.userName,
        };
    }
    componentDidMount() {
        axios.defaults.headers = {
            'Cache-Control': 'no-cache',
            Pragma: 'no-cache',
            Expires: '0',
        };
        axios
            .get('/api/v1/stories/')
            .then((response) => {
                //console.log(response);
                this.setState({
                    ViewList: response.data.storyData,
                });
            })
            .catch((err) => {
                //console.log(err);
            });
    }
    render() {
        const { ViewList } = this.state;
        const arr = [];
        for (let i = 0; i < ViewList.length; i++) {
            if (
                ViewList[i].authorUsername !=
                this.state.userName
            )
                continue;
            arr.push(ViewList[i]);
        }
        //console.log('ksehfi', arr);
        return (
            <PrintStories
                data={arr}
                userName={this.state.userName}
            />
        );
    }
}
export default UserSpecificStoryList;
