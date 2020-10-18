import React from 'react';
import './Single_book.css';
import 'mdbreact/dist/css/mdb.css'
import {MDBBtn} from 'mdbreact';


const SingleBook = ({ book }) => {

    return (
        <div className="single-book-main">
            <div id="book-details" className="container my-5 z-depth-1">


                <section className="dark-grey-text">

                    <div class="row pr-lg-5">
                        <div class="col-md-7 mb-4">

                            <div class="view d-flex justify-content-center border border-light p-5">
                                <img src={book.Cover} class=" h-100 d-inline-block w-50 p-3" alt="smaple image" />
                            </div>
                            <div class="text-center" >
                            </div>

                        </div>
                        <div class="col-md-5 d-flex align-items-center">
                            <div>

                                <h3 class="font-weight-bold mb-4 text-center">{book.Title}</h3>

                                <p class="text-center" class="text-justify">{book.Description}</p>

                            <div id="buttons" class="text-center">
                            <MDBBtn id="main-button"  > Borrow </MDBBtn>
                            <MDBBtn id="main-button"  > Reviews </MDBBtn>
                            </div>
                            </div>
                        </div>
                    </div>

                </section>
            </div>
        </div>
    )
};

export default SingleBook;