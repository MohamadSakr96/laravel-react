import React from 'react';
import axios from 'axios';

export default function Profile() {


    axios
            .get('http://127.0.0.1:8000/api/auth/user-profile',{  
                headers: { 
                    Authorization: `Bearer ${localStorage.getItem('user')}` 
                }
            })
            .then((response) => {
                console.log(response.data);
            }).catch(error => {
                console.log(error);
        });


  return (
    <h2>Profile</h2>
  );
}