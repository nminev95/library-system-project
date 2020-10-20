import React, { useState } from 'react';
import './BanUserPage.css'
import { MDBInput, MDBBtn, MDBContainer, MDBModalBody, MDBModalHeader, MDBRow, MDBModalFooter } from 'mdbreact';
import DatePicker from '../DatePicker/DatePicker';
import { Link } from 'react-router-dom';
import BanDeletePopUp from '../BanDeletePopUp/BanDeletePopUp';

const BanUser = () => {

    const [banInfo, setBanInfo] = useState(null);
    const [expDate, setExpDate] = useState('');
    const [banDescription, setBanDescription] = useState('');

    const updateDate = (date) => {
        setExpDate(date);
    }

    console.log(expDate)
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
                <MDBBtn style={{ margin: "20px", float: "right" }} onClick={() => console.log({expDate, banDescription})}>Submit</MDBBtn>

            </MDBContainer>
        </>
    );
}

export default BanUser;