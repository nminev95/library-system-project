import React, { useState } from 'react';
import 'mdbreact/dist/css/mdb.css'
import './Header.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { MDBFormInline,MDBNavbar, MDBNavbarBrand, MDBNavbarToggler, MDBIcon, MDBCollapse, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu,MDBDropdownItem} from 'mdbreact';
import UserDropdown from './UserDropdown/UserDropdown';
import image from './Logo.png';

const NavBar = () => {
 
    const [state, setState] = useState(false)
    
      
     const  toggleCollapse = () => {
        setState((prevState) => !prevState);
      }

    return (
        <Router>
        <MDBNavbar color="grey" dark expand="md">
        <MDBNavbarBrand>
          <strong className="black-text">Navbar</strong>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={state} navbar>
          <MDBNavbarNav left>
            <MDBNavItem active>
              <MDBNavLink to="#!" className="black-text">Home</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="#!" className="black-text">All books</MDBNavLink>
            </MDBNavItem>
          </MDBNavbarNav>
          <MDBNavbarNav right>
          <MDBFormInline waves>
                <div className="md-form my-0">
                <input className="form-control form-control-sm mr-3 w-75" type="text" placeholder="Search..."
                aria-label="Search" />
                </div>
              </MDBFormInline>     
            <MDBNavItem>
              <MDBDropdown>
                <MDBDropdownToggle nav caret >
                  <MDBIcon icon="user" className="d-md-inline" />
                </MDBDropdownToggle>
                <MDBDropdownMenu className="right basic" className="left">
                  <MDBDropdownItem href="#!">Profile</MDBDropdownItem>
                  <MDBDropdownItem href="#!">Borrowed books</MDBDropdownItem>
                  <MDBDropdownItem href="#!">Settings</MDBDropdownItem>
                  <MDBDropdownItem href="#!">Logout</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
       </Router>
    )
}

export default NavBar;


{/* <div>
<nav id="nav-bar" className="navbar fixed-top navbar-expand-lg navbar- amber lighten-5 scrolling-navbar ">
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon black"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">

        <img src={image}></img>
    
        <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
                <a className="nav-bar-link" href="#"> Home <span className="sr-only">(current)</span></a>

                <a className="nav-bar-link" href="#"> Аll books <span className="sr-only">(current)</span></a>
            </li>

        </ul>

        <form className="form-inline d-flex justify-content-center md-form form-sm">
            <input className="form-control form-control-sm mr-3 w-75" type="text" placeholder="Search..."
                aria-label="Search" />
            <i class="fas fa-search fa-lg " aria-hidden="true"></i>
        </form>
        <ul className="navbar-nav nav-flex-icons">
            <li className="nav-item">
                <UserDropdown />
            </li>

        </ul>
    </div>
</nav>

</div> */}