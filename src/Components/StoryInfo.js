import '../App.css';
import StoryTitle from './StoryTitle.js';

function StoryInfo(props) {
    return (
        <div className="story-info">
            <StoryTitle story={props.story} />
            <div className="storyOpeningLines">
                {props.story.openingLines}
            </div>
        </div>
    );
}

export default StoryInfo;
