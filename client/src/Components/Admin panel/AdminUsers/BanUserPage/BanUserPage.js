import React, { useState } from 'react';
import './BanUserPage.css'
import { MDBInput, MDBBtn, MDBContainer, MDBModalBody, MDBModalHeader, MDBRow, MDBModalFooter } from 'mdbreact';
import DatePicker from '../DatePicker/DatePicker';
import { Link } from 'react-router-dom';

const BanUser = (props) => {

    const [expDate, setExpDate] = useState('');
    const [banDescription, setBanDescription] = useState('');
    
    const sendBanUserData = async ({ desc, date }, id) => {

        const settings = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({description: desc, expirationDate: date})
        };
        try {
            const data = await fetch(`http://localhost:4000/admin/users/${id}/banstatus`, settings);
        } catch (e) {
            return e;
        }
    }

    return (
        <>
            <Link to="/admin/users">
                <MDBBtn style={{ margin: "20px" }}>Back to users</MDBBtn>
            </Link>
            <MDBContainer className="banUserAdminContainer">
                <MDBRow className="banDateRow">
                    <DatePicker setDate={(date) => setExpDate(date)}/>
                </MDBRow>
                <MDBInput type="textarea" 
                label="Enter ban description/reason" 
                rows="5" 
                value={banDescription}
                onChange={(ev) => setBanDescription(ev.target.value)} />
                <MDBBtn style={{ margin: "20px", float: "right" }} onClick={() => sendBanUserData({desc: banDescription, date: expDate.toISOString().split('T')[0]}, props.location.state.id)}>Submit</MDBBtn>

            </MDBContainer>
        </>
    );
}

export default BanUser;