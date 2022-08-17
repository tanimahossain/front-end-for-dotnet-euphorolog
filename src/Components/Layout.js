import React, { Component } from 'react';
//import { toast, ToastContainer } from 'react-toastify';
// <ToastContainer
//     position="bottom-center"
//     autoClose={2000}
// />
/*

        if (successAlert) {
            toast.success(successAlert);
            setTimeout(
                () => this.context.setAlert('success', ''),
                2100
            );
        }
 */
import 'react-toastify/dist/ReactToastify.css';
import '../App.css';
import AllContext from './AllContext';
import Footer from './Footer';
import Loading from './Loading';
import Navbar from './Navbar';
class Layout extends Component {
    static contextType = AllContext;
    componentDidMount() {
        //const { setRedirect } = this.context;
        //setRedirect(false);
    }
    render() {
        const { isLoading } = this.context;
        return (
            <>
                <Loading loading={isLoading} />
                <Navbar />
                <div className="navDiv"></div>
                {this.props.children}
                <Footer />
            </>
        );
    }
}
export default Layout;
/*
                {this.props.children}
                {React.cloneElement(this.props.children, {
                    setAuth: this.setAuth,
                })}

*/
