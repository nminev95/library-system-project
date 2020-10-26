import React, { useContext, useState } from 'react';
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
import ProfileBorrowedBooks from './Components/Private page/Profile/BorrowedBooks/ProfileBorrowedBooks';
import SearchResultPage from './Components/Private page/SearchResultPage/SearchResultPage';
import ProfilePage from './Components/Private page/Profile/ProfilePage/ProfilePage'
import { AuthContext } from './Components/Private page/Context/AuthContext';
import decode from 'jwt-decode';
import PrivatePage from './Components/Private page/PrivatePage';
import PublicPage from './Components/Public page/PublicPage';

function App() {

  const token = localStorage.getItem('token');
  const [authValue, setAuthValue] = useState({
    isLoggedIn: token ? true : false,
    user: token ? decode(token) : null
  });

  if (token) {
    const decoded = decode(token);
    const expiration = new Date(decoded.exp * 1000);
    if (expiration < new Date()) {
      localStorage.removeItem('token');
      setAuthValue(false);
    }
  }
  console.log(authValue)
  return (
    <>
<Router>

      <AuthContext.Provider value={{ ...authValue, setLoginState: setAuthValue }}>
         <Header />
        <div className="body">
          {authValue.user ? <PrivatePage /> : <PublicPage />}
          {authValue.user && authValue.user.role === 'admin' ? <AdminRoutes /> : <PrivatePage />}
          {/* {authValue.user.role === 'admin' ? <AdminRoutes /> : <PrivatePage />} */}
          {/* <Route exact path='/books' exact component={HomepageLogged} /> */}
          {/* <Redirect from="/" exact to="/home" />
              <Route path='/home' exact component={HomePage} />
              <Route path='/auth/signin' component={LoginForm} />
            <Route exact path='/users' exact component={RegisterForm} /> */}
          {/* <Route path='/admin' component={AdminRoutes} /> */}
          {/* <Route exact path='/books/:id' exact component={IndividualBook} />
              <Route exact path='/profile/borrowed' component={ProfileBorrowedBooks} />
              <Route path="/profile" component={ProfilePage} />
            <Route path='/search' component={SearchResultPage} /> */}

        </div>
        <Footer />
      </AuthContext.Provider>

            </Router>

    </>
  );
}

export default App;
