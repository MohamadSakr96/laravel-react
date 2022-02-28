import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { forget } from '../../features/auth/authSlice';

export default function Navbar(props) {

    const dispatch = useDispatch();

    const logout = () => {
        dispatch(forget());
        axios.get('http://127.0.0.1:8000/api/auth/logout',{  
          headers: { 
              Authorization: `Bearer ${localStorage.getItem('user')}` 
          }
      })
      .then((response) => {
          console.log(response["message"]);
          localStorage.clear();
      }).catch(error => {
          console.log(error);
      });
    };

    let menu;

    if (Object.keys(props).length === 0) {
        menu = (
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
        )
    }else {
        menu = (
            <div className="navbar-nav nav-cont">
                <div className='navbar-left'>
                    <Link to={"/"} className="nav-link">Home</Link>
                    <Link to={"/profile"} className="nav-link active">Profile</Link>
                    <Link to={"/services"} className="nav-link">Services</Link>
                    <Link to={"/contactus"} className="nav-link">Contact Us</Link>
                </div>
                <div className='navbar-right'>
                    <Link to={"/login"} onClick={logout} className="nav-link">Logout</Link>
                </div>
            </div>
        )
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    {menu}
                </div>
            </div>
        </nav>
    );
    
}