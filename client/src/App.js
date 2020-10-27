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
import IndividualBook from './Components/Private page/SingleBookContent/IndividualBook/IndividualBook';
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
    const expiration = new Date(decoded.exp * 1000); /// setTimout !!
    if (expiration < new Date()) {
      localStorage.removeItem('token');
      setAuthValue(false);
    }
  }

  const authRenderer = (user) => {
    if (!user) {
      return <PublicPage />
    } else {
      if (user && user.role === 'user') {
        return <PrivatePage />
      } else if (user && user.role === 'admin') {
        return (
          <>
            <PrivatePage />
            <AdminRoutes />
          </>
        )
      }
    }
  }


  return (
    <>
      <Router>
        <AuthContext.Provider value={{ ...authValue, setLoginState: setAuthValue }}>
          <Header />
          <div className="body">
            {authRenderer(authValue.user)}
          </div>
          <Footer />
        </AuthContext.Provider>

      </Router>

    </>
  );
}

export default App;
