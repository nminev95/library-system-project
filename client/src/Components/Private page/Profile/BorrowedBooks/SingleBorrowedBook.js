import React, { Component } from 'react';
import 'mdbreact/dist/css/mdb.css';
import { MDBCol, MDBCard, MDBCardBody, MDBCardImage, MDBView, MDBCardTitle, MDBBtn, MDBIcon } from 'mdbreact';
import './BorrowedBooks'


import { MDBCollapse } from "mdbreact";
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';
const SingleBorrowedBook = ({ book }) => {
    const bookId = book.book_Id;

    const returnBoook = async () => {

        const settings = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer  ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json'
            },
        };
        try {
            const data = await fetch(`http://localhost:4000/books/${bookId}`, settings);
            swal({
                title: "Success!",
                text: "Book was returned successfully.",
                icon: "success",
                buttons: false,
                timer: 1500,
            });
        } catch (error) {
            return error.message;
        }
    }
    return (
        <div id="borrowed-book" >
            <MDBCol xs="8" className="cardBook" style={{ margin: "0px", padding: "0" }}>
                <MDBCard id="card" className="border-0 justify-content-center">
                    <MDBView cascade className="justify-content-center">
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
                        <MDBBtn id="main-button" onClick={returnBoook} >  Return </MDBBtn>
                    </MDBCardBody>
                </MDBCard>
            </MDBCol>
        </div>
    )

};



export default SingleBorrowedBook;
