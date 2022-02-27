import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

export default function Navbar() {
    const [status, setStatus] = React.useState(true);

    React.useEffect(()=>{
        const items = localStorage.getItem('user');
        if (items) {
            setStatus(false);
        }
    },[status]);

    if (status) {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav nav-cont">
                            <div className='navbar-left'>
                                <Link to={"/"} className="nav-link active">Home</Link>
                                <Link to={"/services"} className="nav-link">Services</Link>
                                <Link to={"/contactus"} className="nav-link">Contact Us</Link>
                            </div>
                            <div className='navbar-right'>
                                <Link to={"/login"} className="nav-link">Login</Link>
                                <Link to={"/register"} className="nav-link">Register</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }else {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav nav-cont">
                            <div className='navbar-left'>
                                <Link to={"/profile"} className="nav-link active">Profile</Link>
                                <Link to={"/"} className="nav-link">Home</Link>
                                <Link to={"/services"} className="nav-link">Services</Link>
                                <Link to={"/contactus"} className="nav-link">Contact Us</Link>
                            </div>
                            <div className='navbar-right'>
                                <Link to={"/logout"} className="nav-link">Logout</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
    
}