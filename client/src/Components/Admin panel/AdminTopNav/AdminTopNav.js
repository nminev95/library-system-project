import React, { useState } from 'react';
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink, MDBIcon, MDBBtn } from 'mdbreact';
import TopNavBtn from '../TopNavButton/TopNavButton';

const TopNav = (props) => {
    
    const [collapsed, setCollapsed] = useState(false);

    const collapse = () => {
        return setCollapsed(!collapsed)
    }

    return (
        <MDBNavbar className="flexible-navbar" light expand="md" scrolling>
            <MDBNavbarToggler onClick={collapse} />
            <MDBCollapse isOpen={collapsed} navbar>
                {/* <MDBNavbarNav left>
                    <TopNavBtn route={'/users'} button={'hahaha'}/>
                    <MDBNavItem>
                        <a rel="noopener noreferrer" className="nav-link Ripple-parent" href="https://mdbootstrap.com/docs/react/" target="_blank">{props.buttons}</a>
                    </MDBNavItem>
                    <MDBNavItem>
                        <a rel="noopener noreferrer" className="nav-link Ripple-parent" href="https://mdbootstrap.com/docs/react/getting-started/download/" target="_blank">Free download</a>
                    </MDBNavItem>
                    <MDBNavItem>
                        <a rel="noopener noreferrer" className="nav-link Ripple-parent" href="https://mdbootstrap.com/bootstrap-tutorial/" target="_blank">Free tutorials</a>
                    </MDBNavItem>
                </MDBNavbarNav> */}
                <MDBNavbarNav right>
                    <MDBBtn>Logout</MDBBtn>
                </MDBNavbarNav>
            </MDBCollapse>
        </MDBNavbar>
    );
}

export default TopNav;