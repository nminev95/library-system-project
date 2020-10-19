import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SingleBook from './Components/Private page/Single book content/IndividualBookDetails'
import HomePage from './Components/Public page/Homepage/Homepage';
import LoginForm from './Components/Public page/LoginForm/LoginForm';
import RegisterForm from './Components/Public page/RegisterForm/RegisterForm';
import HomepageLogged from './Components/Private page/Homepage/HomepageLogged';
import Header from './Components/Private page/Header/Header';
import Footer from './Components/Private page/Footer/Footer';
import IndividualBook from './Components/Private page/Single book content/IndividualBook';
import NotFound from './Components/NotFound';
import AdminHome from './Components/Admin panel/AdminHome';

function App() {
  return (
    <>
      <Header />
      <Router>
        <div className="body">
          <Switch>
            <Route path='/' exact component={HomePage} />
            <Route path='/auth/signin' component={LoginForm} />
            <Route path='/users' component={RegisterForm} />
            <Route exact path='/books' component={HomepageLogged} />
            <Route path='/books/:id' component={IndividualBook} />
            <Route path='/admin' component={AdminHome}/>
          </Switch>
        </div>
      </Router>
       <Footer /> 
    </>
  );
}

export default App;
