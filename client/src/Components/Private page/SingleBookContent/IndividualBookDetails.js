import React from 'react';
import {useState} from 'react'
;import './IndividualBook.css';
import 'mdbreact/dist/css/mdb.css'
import { MDBBtn } from 'mdbreact';


const IndividualBookDetails = ({ bookData }) => {
    const [borrowMode, setModeBorrow] = useState(true);
    const toggleBorrowMode = () => {
        setModeBorrow((prevState) => !prevState);
    };

    const bookId = bookData.id;

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

    //WHERE DOES IT SHOULD BE?

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
                        <div className="p-5 ">
                            <h3 className="font-weight-bold text-center">{bookData.Title}</h3>
                        </div>
                        <div className="p-1 text-center text-justify ">
                            <div>{bookData.Rating}</div>
                        </div>
                        <div className="p-4">
                            <p className="text-center text-justify" >{bookData.Description}</p>
                        </div>

                        <div id="buttons" className="text-center p-5">
                            {borrowMode && bookData.Status === "Free" ?
                                <MDBBtn id="main-button" onClick={borrowBoook}> Borrow </MDBBtn> :
                                <MDBBtn id="main-button" onClick={returnBoook}> Return </MDBBtn>
                            }
                        </div>

                    </div>
                </div>


            </section>
        </div>

    )
};

export default IndividualBookDetails;