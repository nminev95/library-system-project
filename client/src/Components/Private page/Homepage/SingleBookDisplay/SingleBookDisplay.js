import React from 'react';
import './SingleBookDisplay.css'
import { MDBCol, MDBCard, MDBCardBody, MDBCardImage, MDBView, MDBCardTitle, MDBCardText, MDBInput, MDBBtn, MDBIcon, MDBModalFooter } from 'mdbreact';

import { withRouter, Link } from 'react-router-dom';

const SingleBookDisplay = ({book, history}) => {

    return (
        <MDBCol xl="3" className="cardBook">
            <MDBCard style={{height: '100%'}}>
                <MDBView cascade className="d-flex justify-content-center" style={{maxHeigth: '342px', minHeight: '342px'}}>
                    <MDBCardImage id="bookImageContainer"
                        hover
                        style={{maxHeigth:"200px", minHeight: '200px'}}
                        overlay='white-slight'
                        className='card-img-top w-responsive text-center mx-auto p-3 mt-2 h-auto d-inline-block'
                        src={book.Cover}
                        alt='food'
                    />
                </MDBView>
                <MDBCardBody style={{justifyContent: 'flex-end', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <h5 className='pink-text'>
                        <MDBIcon icon='pen-nib' />{book.Genre}
                    </h5>
                    <MDBCardTitle className='font-weight-bold'>
                        {book.Title}
                    </MDBCardTitle>
                    <MDBCardTitle>
                        {book.Author}
                    </MDBCardTitle>
                    <MDBCardText>
                        Year: {book.Year}
                    </MDBCardText>              
                    <MDBBtn id="main-button" onClick={()=> {history.push(`/books/${book.id}`)}} style={{width: '30%'}}>  See more </MDBBtn>        
                </MDBCardBody>
            </MDBCard>
        </MDBCol>
    )
}

export default withRouter(SingleBookDisplay);