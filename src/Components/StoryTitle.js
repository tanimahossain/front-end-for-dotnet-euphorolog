import { Link } from 'react-router-dom';
import '../App.css';

function StoryTitle(props) {
    const storyUrl = '/stories/' + props.story.storyId;
    const userUrl = '/users/' + props.story.authorUsername;
    return (
        <div className="storyTitle">
            <h3>
                <Link
                    to={storyUrl}
                    className="noUnderLine shadow"
                >
                    {props.story.storyTitle}
                </Link>
            </h3>
            {props.flag && (
                <Link to={userUrl} className="noUnderLine">
                    <span className="authorName noUnderLine shadow">
                        Author Name:{' '}
                        {props.story.authorUsername}
                    </span>
                </Link>
            )}
            {!props.flag && (
                <span className="noUnderLine">
                    Author Name:{' '}
                    {props.story.authorUsername}
                </span>
            )}
        </div>
    );
}

export default StoryTitle;
