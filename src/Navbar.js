import { FaArrowRight, FaRegUser } from 'react-icons/fa';
import './App.css';
import logo from './appLogo.png';
function Navbar() {
    return (
        <div>
            <nav>
                <img src={logo}></img>
                <a href="/auth/" className="navSignUpLogIn">
                    <span className="icon">
                        <FaRegUser />
                    </span>
                    SignUp/
                    <span className="icon">
                        <FaArrowRight />
                    </span>
                    LogIn
                </a>
            </nav>
        </div>
    );
}

export default Navbar;
