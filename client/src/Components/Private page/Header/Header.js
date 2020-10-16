import React, { useState } from 'react';
import 'mdbreact/dist/css/mdb.css'
import './Header.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import { MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from "mdbreact";
import UserDropdown from './UserDropdown/UserDropdown';

const NavBar = () => {

    return (
        <div>
            <nav id="nav-bar" className="navbar fixed-top navbar-expand-lg navbar- amber lighten-5 scrolling-navbar">
                <a className="navbar-brand" href="#"><strong>Navbar</strong></a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="#"> Home <span className="sr-only">(current)</span></a>
                        </li>

                    </ul>

                    <form className="form-inline md-form mt-0 mb-0">

                        <input className="form-control mr-sm-2 length-5 " type="text" placeholder="Search..." aria-label="Search" />
                        <button className="btn black btn-rounded btn-sm my-0 text-white fa-lg" type="submit">Search</button>

                    </form>


                    <ul className="navbar-nav nav-flex-icons">
                        <li className="nav-item">
                            <UserDropdown />
                        </li>

                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default NavBar;