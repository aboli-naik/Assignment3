import logo from './logo.svg';
import './App.css';

import Home from './components/Home'
import {Route , Switch, BrowserRouter as Router,Link} from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard'
import Header from './components/Header'
import MyAccount from './components/MyAccount'
import Edit from './components/Edit'

function App() {
  return (
    <div className="App"> 
<Header/>
        <Link to = "Login"> Login  </Link>
        <Link to = "Register"> Register  </Link>
        <Link to = "MyAccount"> MyAccount  </Link>
        <Link to = "Edit"> Edit  </Link>
        <Router>
     <Switch>
       
        <Route path ="/Dashboard" component={Dashboard}/>
        <Route path ="/login" component={Login}/>
        <Route path ="/register" component={Register}/>
        <Route path ="/MyAccount" component={MyAccount}/>
        <Route path ="/Edit" component={Edit}/>

            </Switch>
            </Router>
         </div>
  );
}

export default App;
