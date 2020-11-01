import React, { useState } from 'react';
import './BanUserPage.css'
import { MDBInput, MDBBtn, MDBContainer, MDBRow } from 'mdbreact';
import DatePicker from '../DatePicker/DatePicker';
import { Link, useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import swal from 'sweetalert';

const BanUser = (props) => {

    const [expDate, setExpDate] = useState('');
    const [banDescription, setBanDescription] = useState('');
    const [isValidDescription, setIsValidDescription] = useState(true);
    const [isValidDate, setIsValidDate] = useState(true);
    const history = useHistory();

    const sendBanUserData = async ({ desc, date }, id) => {
        if (!date) {
            setIsValidDate(false);
            return;
        } else {
            setIsValidDate(true);
        }
        if (desc.trim().length < 15 || desc.trim().length > 100) {
            setIsValidDescription(false)
            return;
        } else {
            setIsValidDescription(true);    
        }
        const formattedDate = date.toISOString().split('T')[0]
        const settings = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer  ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({ description: desc, expirationDate: formattedDate })
        };
        try {
            const data = await fetch(`http://localhost:4000/admin/users/${id}/banstatus`, settings);
            swal({
                title: "Success!",
                text: "User was banned successfully!",
                icon: "success",
                buttons: false,
                timer: 1500,
            })
            history.push('/admin/users')
        } catch (e) {
            return e;
        }
    }

    return (
        <>
            <Link to="/admin/users">
                <MDBBtn style={{ margin: "20px" }}>Back to users</MDBBtn>
            </Link>
            <MDBContainer className="banUserAdminContainer" style={{textAlign:"center"}}>
                <MDBRow className="banDateRow">
                    <DatePicker setDate={(date) => setExpDate(date)} />
                </MDBRow>
                {isValidDate ? (null) : (<div style={{color:"red"}}>Please select an expiration date from the calendar.</div>)}
                <br></br>
                {isValidDescription ? (
                    <TextField
                    style={{width:"60%"}}
                        id="outlined-multiline-static"
                        label="Enter ban description/reason"
                        multiline
                        rows={5}
                        defaultValue="Default Value"
                        variant="outlined"
                        value={banDescription}
                        onChange={(ev) => setBanDescription(ev.target.value)}
                    />
                ) : (
                    <TextField
                    style={{width:"60%"}}
                    id="outlined-multiline-static"
                    label="Enter ban description/reason"
                    error
                    helperText="Ban description must be between 15 and 100 characters long."
                    multiline
                    rows={5}
                    defaultValue="Default Value"
                    variant="outlined"
                    value={banDescription}
                    onChange={(ev) => setBanDescription(ev.target.value)}
                />
                )}
                <MDBBtn style={{ margin: "20px"}} onClick={() => {
                    sendBanUserData({ desc: banDescription, date: expDate }, props.location.state.id)}
                }>Submit</MDBBtn>
            </MDBContainer>
        </>
    );
}

export default BanUser;