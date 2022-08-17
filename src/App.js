import axios from 'axios';
import Modal from 'react-modal';
import {
    BrowserRouter,
    Navigate,
    Route,
    // eslint-disable-next-line prettier/prettier
    Routes
} from 'react-router-dom';
import './App.css';
import { AllProvider } from './Components/AllContext.js';
import Layout from './Components/Layout.js';
import HomePage from './Pages/HomePage.js';
import PostStoryPage from './Pages/PostStoryPage.js';
import ProfilePage from './Pages/ProfilePage.js';
import SignUpLogIn from './Pages/SignUpLogIn.js';
import StoryDetails from './Pages/StoryDetails.js';
import UserUpdatePage from './Pages/UserUpdatePage.js';
Modal.setAppElement('#root');
function App() {
    window['console']['warning'] = function () {};
    axios.defaults.headers = {
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache',
        Expires: '0',
    };
    return (
        <>
            <AllProvider>
                <BrowserRouter>
                    <Layout>
                        <Routes>
                            <Route
                                path="/homepage"
                                exact
                                element={<HomePage />}
                            />
                            <Route
                                path="/stories/"
                                exact
                                element={<PostStoryPage />}
                            />
                            <Route
                                path="/stories/:id"
                                exact
                                element={<StoryDetails />}
                            />
                            <Route
                                path="/users/"
                                exact
                                element={<UserUpdatePage />}
                            />
                            <Route
                                path="/users/:id"
                                exact
                                element={<ProfilePage />}
                            />
                            <Route
                                path="/auth"
                                exact
                                element={<SignUpLogIn />}
                            />
                            <Route
                                path="*"
                                element={
                                    <Navigate to="/homepage" />
                                }
                            />
                        </Routes>
                    </Layout>
                </BrowserRouter>
            </AllProvider>
        </>
    );
}
/*

                            <Route
                                path="/stories/:id/edit"
                                exact
                                element={<UpdateStory />}
                            />*/
export default App;
