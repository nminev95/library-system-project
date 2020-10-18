import React from 'react';
import './Single_book.css';
import 'mdbreact/dist/css/mdb.css'
import { MDBBtn } from 'mdbreact';


const SingleBook = ({ book }) => {

    return (

        <div id="book-details" className="container my-5 z-depth-1">


            <section className="dark-grey-text">

                <div class="row pr-lg-5 d-flex ">
                    <div class="col-md-4 justify-content-center">

                        <img src={book.Cover} class="w-100 p-4 justify-content-center" alt="smaple image" />


                    </div>
                    <div class="col-md-8 p-4 justify-content-center">

                        <div class="p-5 ">
                            <h3 class="font-weight-bold text-center">{book.Title}</h3>
                        </div>

                        <div class="p-4">
                            <p className=" w-auto text-center text-justify " >{book.Description}</p>
                        </div>

                        <div id="buttons" class="text-center p-5">
                            <MDBBtn id="main-button"  > Borrow </MDBBtn>
                            <MDBBtn id="main-button"  > Reviews </MDBBtn>
                        </div>
                    </div>
                </div>


            </section>
        </div>

    )
};

export default SingleBook;