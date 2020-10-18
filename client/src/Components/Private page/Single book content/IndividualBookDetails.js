import React from 'react';
import './Single_book.css';
import 'mdbreact/dist/css/mdb.css'
import { MDBBtn } from 'mdbreact';


const IndividualBookDetails = ({ bookData }) => {
 console.log(bookData)
    return (

        <div id="book-details" className="container my-5 z-depth-1">


            <section className="dark-grey-text">

                <div className="row pr-lg-5 d-flex ">
                    <div className="col-md-4 justify-content-center">
                        <img src={bookData.Cover} className="w-100 p-4 justify-content-center" alt="smaple image" />
                    </div>
                    <div className="col-md-8 p-4 ">
                <div className="p-5 ">
                            <h3 className="font-weight-bold text-center">{bookData.Title}</h3>
                        </div>
                        <div className="p-4">
                            <p className="text-center text-justify" >{bookData.Description}</p>
                        </div>

                        <div id="buttons" className="text-center p-5">
                            <MDBBtn id="main-button"  > Borrow </MDBBtn>
                            <MDBBtn id="main-button"  > Reviews </MDBBtn>
                        </div>
                    </div>
                </div>


            </section>
        </div>

    )
};

export default IndividualBookDetails;