import React from 'react';
import 'mdbreact/dist/css/mdb.css';
import { MDBCol, MDBCard, MDBCardBody, MDBCardImage, MDBView, MDBCardTitle, MDBBtn, MDBIcon } from 'mdbreact';


const SingleBorrowedBook = ( {book} ) => {

    return (
        <div id="borrowed-book" className="pt-2 pb-2" >
         <MDBCol xl="3" className="cardBook">
            <MDBCard className="border-0">
                <MDBView cascade className="d-flex justify-content-center">
                    <MDBCardImage id="bookImageContainer"
                        hover
                        overlay='white-slight'
                        className='card-img-top w-responsive text-center mx-auto p-3 mt-2 h-auto d-inline-block'
                        src={book.imageUrl}
                        alt='food'
                    />
                </MDBView>
                <MDBCardBody>
                    <MDBCardTitle className='font-weight-bold'>
                        {book.title}
                    </MDBCardTitle>
                    <MDBCardTitle>
                        {book.author}
                    </MDBCardTitle>            
                    <MDBBtn id="main-button"  >  Return </MDBBtn>        
                </MDBCardBody>
            </MDBCard>
        </MDBCol>
    </div>
    )
        
};



export default SingleBorrowedBook;