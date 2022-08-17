import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import StoryInfo from './StoryInfo.js';
import Preview from './StoryListPreview.js';
function Story(props) {
    const storyUrl = '/stories/' + props.story.storyId;
    const navigate = useNavigate();
    return (
        <div
            className="container"
            onClick={() => {
                navigate(storyUrl);
            }}
        >
            <div className="story">
                <Preview
                    storyTitle={props.story.storyTitle}
                    storyId={props.story.storyId}
                    createdAt={props.story.createdAt}
                    updatedAt={props.story.updatedAt}
                />
                <StoryInfo story={props.story} />
            </div>
        </div>
    );
}

export default Story;
