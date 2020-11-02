import React, { useContext, useState } from 'react';
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink, MDBIcon, MDBBtn } from 'mdbreact';
import TopNavBtn from '../TopNavButton/TopNavButton';
import { useLocation } from 'react-router-dom';
import AuthContext from '../../Private page/Context/AuthContext';
import swal from 'sweetalert';

const TopNav = (props) => {
    const path = useLocation().pathname
    const [collapsed, setCollapsed] = useState(false);
    const { setLoginState } = useContext(AuthContext);
    const collapse = () => {
        return setCollapsed(!collapsed)
    }

    const handleLogout = () => {

        fetch('http://localhost:4000/signout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer  ${localStorage.getItem("token")}`,
            'Content-Type': 'application/json'
          },
        })
          .then(res => res.json())
          .then(data => {
            if (data.message) {
              swal({
                title: "Sorry to see you go! :(",
                text: "You have logged out successfully!",
                icon: "success",
                buttons: false,
                timer: 1500,
              })
            }
          })
        setTimeout(() => {
          localStorage.removeItem("token");
          setLoginState(false);
        }, 1500)
      }

    return (
        <>
            {!(path.includes('admin')) ?
                (null)
                : (
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
                                <MDBBtn onClick={() => handleLogout()}>Logout</MDBBtn>
                            </MDBNavbarNav>
                        </MDBCollapse>
                    </MDBNavbar>
                )
            }
        </>
    );
}

export default TopNav;