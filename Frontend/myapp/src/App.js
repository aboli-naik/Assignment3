import logo from './logo.svg';
import './App.css';

import Home from './components/Home'
import {Route , Switch, BrowserRouter as Router,Link, BrowserRouter} from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard'
import Header from './components/Header'
import MyAccount from './components/MyAccount'
import Edit from './components/Edit'
import { useState, useEffect } from 'react'
import CoursesList from './components/CoursesList';

function App() {


 


 

  return (
    <BrowserRouter>
    <div className="App"> 


<Header/>
        <Link to = "Login"> Login  </Link>
        <Link to = "Register"> Register  </Link>
        <Link to = "MyAccount"> MyAccount  </Link>
        <Link to = "Edit"> Edit  </Link>
        <Link to = "CoursesList"> CoursesList  </Link>
        <Router>
     <Switch>
       
        <Route path ="/Dashboard" component={Dashboard}/>
        <Route path ="/login" component={Login}/>
        <Route path ="/register" component={Register}/>
        <Route path ="/MyAccount" component={MyAccount}/>
        <Route path ="/CoursesList" component={CoursesList}/>
                   </Switch>
            </Router>
         </div>
         </BrowserRouter>
  );
}

export default App;
