import React from 'react';
import './SingleBookDisplay.css'
import { MDBCol, MDBCard, MDBCardBody, MDBCardImage, MDBView, MDBCardTitle, MDBCardText, MDBInput, MDBBtn, MDBIcon, MDBModalFooter } from 'mdbreact';

const SingleBookDisplay = ({ book }) => {

    return (
        <MDBCol xl="3"  className="cardBook">
                        <MDBCard className="border-0">
                            <MDBView cascade className="d-flex justify-content-center">
                                <MDBCardImage id="bookImageContainer"
                                    hover
                                    overlay='white-slight'
                                    className='card-img-top w-responsive text-center mx-auto p-3 mt-2 h-auto d-inline-block'
                                    src={book.Cover}
                                    alt='food'
                                />
                            </MDBView>
                            <MDBCardBody>
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
                                <MDBBtn id="main-button" > See more </MDBBtn>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
    )
}

export default SingleBookDisplay;