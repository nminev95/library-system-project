import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './Components/Homepage';
import LoginForm from './Components/LoginForm';
import RegisterForm from './Components/RegisterForm';
import HomepageLogged from './Components/HomepageLogged';

function App() {
  return (

    <Router>
      <div className="body">
        <Switch>
          <Route path='/' exact component={HomePage} />
          <Route path='/auth/signin' component={LoginForm} />
          <Route path='/users' component={RegisterForm} />
          <Route path='/loggedtesting' component={HomepageLogged} />
        </Switch>
      </div>
    </Router>

  );
}

export default App;