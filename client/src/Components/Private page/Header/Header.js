import React, { useState, useContext } from 'react';
import 'mdbreact/dist/css/mdb.css'
import './Header.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import { BrowserRouter as Router, Link, useHistory, useLocation } from 'react-router-dom';
import { MDBFormInline, MDBNavbar, MDBNavbarBrand, MDBNavbarToggler, MDBIcon, MDBBtn, MDBCollapse, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from 'mdbreact';
import { AuthContext } from '../Context/AuthContext';

const NavBar = () => {
  const { isLoggedIn, setLoginState, user } = useContext(AuthContext);
  const [search, setSearch] = useState('');
  const [state, setState] = useState(false)
  const history = useHistory();
  
  const toggleCollapse = () => {
    setState((prevState) => !prevState);
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoginState(false);
    history.push('/')
  }

  const url = `/search?query=${search}`
  const path = useLocation().pathname

  if (path.includes('admin')) {
    return null;
  } else {
    return (
      <>
        {isLoggedIn ? (
          <MDBNavbar color="grey darken-3" dark expand="md">
            <MDBNavbarBrand>
              <strong className="white-text">ReadMe</strong>
            </MDBNavbarBrand>
            <MDBNavbarToggler onClick={toggleCollapse} />
            <MDBCollapse id="navbarCollapse3" isOpen={state} navbar>
              <MDBNavbarNav left>
                <MDBNavItem >
                  <MDBNavLink to="/home" className="font-weight-bolder">Home</MDBNavLink>
                </MDBNavItem>
                <MDBNavItem  >
                  <MDBNavLink to="/books" className="font-weight-bolder">All books</MDBNavLink>
                </MDBNavItem>
              </MDBNavbarNav>
              <MDBNavbarNav right>
                <MDBFormInline>
                  <input
                    className="form-control mr-sm-2"
                    type="text"
                    placeholder="Search"
                    aria-label="Search"
                    value={search}
                    onChange={(ev) => setSearch(ev.target.value)}
                    onClick={() => setSearch('')}
                  />
                  <Link to={url}>
                    <MDBBtn gradient="aqua"
                      rounded size="sm"
                      type="submit"
                      className="mr-auto"
                    ><MDBIcon icon="search"></MDBIcon>
              Search
              </MDBBtn>
                  </Link>
                </MDBFormInline>
                <MDBNavItem className="profile">
                  <MDBDropdown>
                    <MDBDropdownToggle nav caret >
                      <MDBIcon icon="user" className="d-md-inline  " />
                    </MDBDropdownToggle>
                    <MDBDropdownMenu className="drop-container right basic">
                      <Link to="/profile">
                        <MDBDropdownItem href="#!">Profile</MDBDropdownItem>
                      </Link>
                      <MDBDropdownItem href="/profile/borrowed">Borrowed books</MDBDropdownItem>
                      <MDBDropdownItem href="#!">Settings</MDBDropdownItem>
                      <MDBDropdownItem href="#!" onClick={() => handleLogout()}>Logout</MDBDropdownItem>
                    </MDBDropdownMenu>
                  </MDBDropdown>
                </MDBNavItem>
              </MDBNavbarNav>
            </MDBCollapse>
          </MDBNavbar>
        ) : (
            <MDBNavbar color="grey darken-3" dark expand="md">
              <MDBNavbarBrand>
                <strong className="white-text">ReadMe</strong>
              </MDBNavbarBrand>
              <MDBNavbarToggler onClick={toggleCollapse} />
              <MDBCollapse id="navbarCollapse3" isOpen={state} navbar>
                <MDBNavbarNav left>
                  <MDBNavItem >
                    <MDBNavLink to="/home" className="font-weight-bolder">Home</MDBNavLink>
                  </MDBNavItem>
                </MDBNavbarNav>
                <MDBNavbarNav right>
                  <MDBNavItem >
                    <MDBNavLink to="/auth/signin" className="font-weight-bolder">Sign in</MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem >
                    <MDBNavLink to="/users" className="font-weight-bolder">Register</MDBNavLink>
                  </MDBNavItem>
                </MDBNavbarNav>
              </MDBCollapse>
            </MDBNavbar>
          )}
      </>

    )
  }
}

export default NavBar;
