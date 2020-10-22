import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import HomePage from './Components/Public page/Homepage/Homepage';
import LoginForm from './Components/Public page/LoginForm/LoginForm';
import RegisterForm from './Components/Public page/RegisterForm/RegisterForm';
import HomepageLogged from './Components/Private page/Homepage/HomepageLogged';
import Header from './Components/Private page/Header/Header';
import Footer from './Components/Private page/Footer/Footer';
import IndividualBook from './Components/Private page/Single book content/IndividualBook';
import AdminRoutes from './Components/Admin panel/AdminRoutes';

function App() {
  return (
    <>
      <Router>
      <Header />
        <div className="body">
          <Switch>
          <Redirect from="/" exact to="/home" />
            <Route path='/home' exact component={HomePage} />
            <Route path='/auth/signin' component={LoginForm} />
            <Route exact path='/users' component={RegisterForm} />
            <Route exact path='/books' exact component={HomepageLogged} />
            <Route path='/books/:id' exact component={IndividualBook} />          
            <Route path='/admin' component={AdminRoutes}/>
          </Switch>
        </div>
       <Footer />
      </Router>
    </>
  );
}

export default App;
