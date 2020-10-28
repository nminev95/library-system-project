import React from 'react';
import { useState } from 'react'
import './IndividualBook.css';
import 'mdbreact/dist/css/mdb.css'
import { MDBBtn } from 'mdbreact';
import { useAuth } from '../../../Private page/Context/AuthContext';



const IndividualBookDetails = ({ bookData }) => {
    const { user } = useAuth();
    const loggedUser = user.sub;
    const bookId = bookData.id;
    const borrower = bookData.Borrower;
    const [borrowMode, setModeBorrow] = useState(true);
    const toggleBorrowMode = () => {
        setModeBorrow((prevState) => !prevState);
    };

    const borrowBoook = async () => {

        const ids = {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer  ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json'
            },
        };
        try {
            const data = await fetch(`http://localhost:4000/books/${bookId}`, ids);
            toggleBorrowMode();
        } catch (error) {
            return error.message;
        }
    }

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
            toggleBorrowMode();
        } catch (error) {
            return error.message;
        }
    }


    return (

        <div id="book-details" className="container my-5 z-depth-1">
            <section className="white-text">

                <div className="row d-flex ">
                    <div className="col-md-4 justify-content-center">
                        <img src={bookData.Cover} className="w-100 p-4 justify-content-center" alt="smaple image" />
                    </div>
                    <div className="col-md-8 p-3 ">
                        <div className="p-2 ">
                            <h4 className="font-weight-bold text-center">{bookData.Title}</h4>
                        </div>
                        <div className="p-4 text-center text-justify ">
                            <div> Written by: {bookData.Author}</div>
                        </div>
                        <div className="p-1 text-center text-justify ">
                            <div>{bookData.Rating}</div>
                        </div>
                        <div className="p-3 text-center text-justify bold ">
                            <div>Status: {bookData.Status}</div>
                        </div>
                        <div className="p-4">
                            <p className="text-center text-justify" >{bookData.Description}</p>
                        </div>

                        <div id="buttons" className="text-center p-5">
                            {borrowMode && bookData.Status === "Free" ?
                                <>
                                    <MDBBtn id="main-button" onClick={borrowBoook}> Borrow </MDBBtn>
                                </>
                                :
                                <>
                                    {borrower === loggedUser ?
                                        <>
                                            <MDBBtn id="main-button" onClick={returnBoook}> Return </MDBBtn>
                                        </> :
                                        <div>The book has been borrowed by another user! :) </div>
                                    }
                                </>
                            }
                        </div>

                    </div>
                </div>


            </section>
        </div>

    )
};

export default IndividualBookDetails;