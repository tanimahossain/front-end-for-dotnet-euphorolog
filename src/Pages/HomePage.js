import { useNavigate } from 'react-router-dom';
import '../App.css';
import Stories from '../Components/StoryList.js';
function HomePage() {
    return (
        <>
            <Stories navigate={useNavigate()} />
        </>
    );
}
export default HomePage;
