import React from 'react';
import '../App.css';
import Pagination from './Pagination';
import Story from './Story';

function PrintStories(props) {
    let List = props.data;
    let ViewList = List.map((eStory) => (
        <Story key={eStory.storyId} story={eStory} />
    ));
    if (!List.length) {
        List = ['No Stories to Show'];
        ViewList = List.map((eStory) => (
            <div key={1} className="noStoriesToShow">
                <h1>{eStory}</h1>
            </div>
        ));
    }
    return (
        <>
            <div className="FlexStoryList">
                {ViewList}
                <Pagination
                    currentPage={props.currentPage}
                    Paginate={props.Paginate}
                    mx={props.mx}
                />
            </div>
        </>
    );
}
export default PrintStories;
