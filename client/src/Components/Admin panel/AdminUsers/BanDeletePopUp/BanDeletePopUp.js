import React from 'react';
import { MDBInput, MDBBtn, MDBContainer, MDBRow } from 'mdbreact';

const BanDeletePopUp = () => {
    return (
        <MDBContainer>
            <MDBRow>
                <MDBInput style={{ width: "300px" }} border type="textarea" label="Enter reason/description" rows="5" />
            </MDBRow>
            <MDBRow>
                <div>

                </div>
            </MDBRow>
            <MDBRow>
            </MDBRow>
        </MDBContainer>
    )
}

export default BanDeletePopUp;