import React, { useState } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import './NavBar.css';

const NavBar = () => {

    return (
        <div className="navBar">
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="#home">Library</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                    </Nav>
                    <Nav>
                        <Nav.Link className="signInButton" eventKey={2} href="/auth/signin">
                            Sing In
                    </Nav.Link>
                    <Nav.Link className="registerButton" eventKey={2} href="/users">
                            Register
                    </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default NavBar;