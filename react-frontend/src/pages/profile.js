import React from 'react';
import { Link } from 'react-router-dom';
import '../components/Profile/profile.css';


export default function Profile(props) {

    if (props.user[0] === '') {
        return (
            <div className='profile-container'>
                <h2>Please Login</h2>
                <Link to={'/login'}>here</Link>
            </div>
        );
    }else {
        return (
            <div className='profile-container'>
                <div className="card">
                    <div className='img-container'>
                        <img src="https://www.pngitem.com/pimgs/m/24-248631_blue-profile-logo-png-transparent-png.png" className="card-img-top" alt="Profile Pic"/>
                    </div>
                    <div className="card-body">
                        <h3 className="card-title">{props.user[0]}</h3>
                        <p className="card-text">{props.user[1]}</p>
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item"><a href='https://github.com/MohamadSakr96'>Github</a></li>
                        <li className="list-group-item"><a href='https://www.linkedin.com/in/mohamadsakr96/'>LinkedIn</a></li>
                    </ul>
                    <div className="card-body">
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="headingThree">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                    Edit Profile
                                </button>
                            </h2>
                            <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    Edit Profile
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          );
    }
}