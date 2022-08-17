import { FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../App.css';
import GetDate from '../utils/DateFormat.js';
function Preview(props) {
    const storyUrl = '/stories/' + props.storyId;
    return (
        <div className="story-preview">
            <div className="storyDate-container">
                <span className="storyDate-text">
                    Created at:{' '}
                    <div>
                        <GetDate
                            date={props.createdAt}
                            newline={true}
                        />
                    </div>
                    Last Updated at:{' '}
                    <div>
                        <GetDate
                            date={props.updatedAt}
                            newline={true}
                        />
                    </div>
                </span>
            </div>
            <Link to={storyUrl} className="noUnderLine">
                <div className="seeFullStory">
                    See Full Story
                    <span className="icon">
                        <FaChevronRight />
                    </span>
                </div>
            </Link>
        </div>
    );
}

export default Preview;
