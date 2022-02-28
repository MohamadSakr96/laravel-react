import React from 'react';
import { Link } from 'react-router-dom';


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
                <h2>Profile</h2>
                <div>{props.user[0]}</div>
                <div>{props.user[1]}</div>
                <button type='button' className='btn btn-primary'>Edit</button>
            </div>
          );
    }
  
}