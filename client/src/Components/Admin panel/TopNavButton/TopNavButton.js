import React from 'react';
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink, MDBIcon, MDBBtn } from 'mdbreact';
import { Link } from 'react-router-dom';

const TopNavBtn = (props) => {
    return (
        <MDBNavItem>
            <Link to={props.route}>{props.button}</Link>
        </MDBNavItem>
    )
}

export default TopNavBtn;