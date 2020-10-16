import React, { useState } from 'react';
import 'mdbreact/dist/css/mdb.css'
import './Header.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

const NavBar = () => {

    return (
        <div>
            <nav id="nav-bar" class="navbar fixed-top navbar-expand-lg navbar- amber lighten-5 scrolling-navbar">
                <a class="navbar-brand" href="#"><strong>Navbar</strong></a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item active">
                            <a class="nav-link" href="#"> Home <span class="sr-only">(current)</span></a>
                        </li>

                    </ul>
          
                    <form class="form-inline md-form mt-0 mb-0">

                        <input class="form-control mr-sm-2 length-5 " type="text" placeholder="Search..." aria-label="Search" />
                        <button class="btn black btn-rounded btn-sm my-0 text-white fa-lg" type="submit">Search</button>
                        
                    </form>


                    <ul class="navbar-nav nav-flex-icons">
                        <li class="nav-item">
                            <a class="nav-link"><i class="fas fa-user-circle fa-2x"></i></a>
                        </li>

                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default NavBar;