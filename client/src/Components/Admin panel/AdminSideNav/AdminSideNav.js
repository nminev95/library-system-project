import React from 'react';
import { MDBListGroup, MDBListGroupItem, MDBIcon, MDBBtn, MDBContainer } from 'mdbreact';
import { Link, NavLink, useLocation } from 'react-router-dom';
import './AdminSideNav.css'

const SideNav = () => {
    const path = useLocation().pathname

    return (
        <>
            {!(path.includes('admin')) ?
                (null)
                : (
                    <div className="sidebar-fixed position-fixed">
                        <MDBContainer className="buttonDiv">
                            <Link to="/home">
                                <MDBBtn className='backToSite'><MDBIcon icon="home" />Back to website</MDBBtn>
                            </Link>
                        </MDBContainer>
                        <MDBListGroup className="list-group-flush">
                            <NavLink exact={true} to="/admin/dashboard" activeClassName="activeClass">
                                <MDBListGroupItem>
                                    <MDBIcon icon="chart-pie" className="mr-3" />
                        Dashboard
                    </MDBListGroupItem>
                            </NavLink>
                            <NavLink to="/admin/users" activeClassName="activeClass">
                                <MDBListGroupItem>
                                    <MDBIcon icon="user" className="mr-3" />
                        Users
                    </MDBListGroupItem>
                            </NavLink>
                            <NavLink to="/admin/books" activeClassName="activeClass">
                                <MDBListGroupItem>
                                    <MDBIcon icon="book" className="mr-3" />
                        Books
                    </MDBListGroupItem>
                            </NavLink>
                            <NavLink to="/admin/reviews" activeClassName="activeClass">
                                <MDBListGroupItem>
                                    <MDBIcon icon="comments" className="mr-3" />
                        Reviews
                    </MDBListGroupItem>
                            </NavLink>
                        </MDBListGroup>
                    </div>
                )
            }
        </>
    );
}

export default SideNav;