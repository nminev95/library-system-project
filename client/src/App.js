import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import HomePage from './Components/Public page/Homepage/Homepage';
import LoginForm from './Components/Public page/LoginForm/LoginForm';
import RegisterForm from './Components/Public page/RegisterForm/RegisterForm';
import HomepageLogged from './Components/Private page/Homepage/HomepageLogged';
import Header from './Components/Private page/Header/Header';
import Footer from './Components/Private page/Footer/Footer';
import IndividualBook from './Components/Private page/SingleBookContent/IndividualBook';
import AdminRoutes from './Components/Admin panel/AdminRoutes';
import { SearchContext } from './Components/Private page/Context/SearchContext';
import ProfileBorrowedBooks from './Components/Private page/Profile/BorrowedBooks/ProfileBorrowedBooks';

function App() {

  const [currentSearch, setCurrentSearch] = useState('');

  return (
    <>
      <Router>
        <SearchContext.Provider value={{ search: currentSearch, setSearch: setCurrentSearch }}>
          <Header />
        </SearchContext.Provider>
        <div className="body">
          <Switch>
            <Redirect from="/" exact to="/home" />
            <Route path='/home' exact component={HomePage} />
            <Route path='/auth/signin' component={LoginForm} />
            <SearchContext.Provider value={{ search: currentSearch, setSearch: setCurrentSearch }}>
              <Route exact path='/books' exact component={HomepageLogged} />
            </SearchContext.Provider>
            <Route path='/books/:id' exact component={IndividualBook} />
            <Route path='/admin' component={AdminRoutes} />
            <Route exact path='/users' exact component={RegisterForm} />
            <Route exact path='/profile/borrowed' component={ProfileBorrowedBooks} />
            <Route exact path='/books' exact component={HomepageLogged} />
          </Switch>
        </div>
        <Footer />
      </Router>
    </>
  );
}

export default App;
