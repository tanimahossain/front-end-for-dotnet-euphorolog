import { useParams } from 'react-router-dom';
import '../App.css';
//import Navbar from '../Components/Navbar.js';
import UpdateFullStory from '../Components/UpdateFullStory.js';
function StoryDetails() {
    const storyIdParams = useParams();
    console.log('(start)');
    return (
        <>
            <UpdateFullStory storyId={storyIdParams.id} />
        </>
    );
}

export default StoryDetails;
