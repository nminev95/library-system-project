import React from 'react';
import './BanUserPage.css'
import { MDBModal, MDBBtn, MDBContainer, MDBModalBody, MDBModalHeader, MDBRow, MDBModalFooter } from 'mdbreact';
import DatePicker from '../DatePicker/DatePicker';
import { Link } from 'react-router-dom';

const BanUser = () => {
    return (
        <>
            <Link to="/admin/users">
                <MDBBtn style={{margin: "20px"}}>Back to users</MDBBtn>
                </Link> 
            <MDBContainer className="banUserAdminContainer">
                <h3>You are about to ban a user with id 1 and username niki.
                </h3>
                <MDBRow className="banDateRow">
                    <DatePicker />
                </MDBRow>
            </MDBContainer>
        </>
    );
}

export default BanUser;