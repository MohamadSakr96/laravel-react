import React from 'react';
import './App.css';
import Navbar from './components/NavBar/Navbar';
import {BrowserRouter, Route} from "react-router-dom";
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import ContactUs from './pages/contactUs';
import Services from './pages/services';

function App() {
  return (
    <div className='App'>

      <BrowserRouter>
       <Navbar/>
        <Route path={"/"} exact component={Home}/>
        <Route path={"/login"} component={Login}/>
        <Route path={"/register"} component={Register}/>
        <Route path={"/services"} component={Services}/>
        <Route path={"/contactus"} component={ContactUs}/>
      </BrowserRouter>
    </div>

  );
}

export default App;