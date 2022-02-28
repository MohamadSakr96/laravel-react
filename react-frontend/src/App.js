import React, { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/NavBar/Navbar';
import {Route} from "react-router-dom";
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import ContactUs from './pages/contactUs';
import Services from './pages/services';
import Profile from './pages/profile';
import axios from 'axios';
import { useSelector } from 'react-redux';


function App() {

  const status = useSelector((state) => state.auth.value);

  const [user_data, set_user_data] = useState([]);
  useEffect(()=>{
      axios
      .get('http://127.0.0.1:8000/api/auth/user-profile',{  
          headers: { 
              Authorization: `Bearer ${localStorage.getItem('user')}` 
          }
      })
      .then((response) => {
          set_user_data([...user_data, response.data['name'], response.data['email']]);
      }).catch(error => {
          console.log(error);
      });
  },[status]);

  return (
      <div className='App'>
        <Navbar {...user_data}/>
        <Route path={"/"} exact component={Home}/>
        <Route path={"/login"} component={Login}/>
        <Route path={"/register"} component={Register}/>
        <Route path={"/services"} component={Services}/>
        <Route path={"/contactus"} component={ContactUs}/>
        <Route path={"/profile"} component={ () => <Profile user={user_data} />}/>
      </div>
  );
}

export default App;