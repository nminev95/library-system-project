import React from 'react';
import './Single_book.css';
import 'mdbreact/dist/css/mdb.css'


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
                                <button type="button" class=" text-center btn btn-green btn-rounded mx-15 ">Borrow</button>
                            </div>

                        </div>
                        <div class="col-md-5 d-flex align-items-center">
                            <div>

                                <h3 class="font-weight-bold mb-4 text-center">{book.Title}</h3>

                                <p class="text-center" class="text-justify">{book.Description}</p>

                                <div>
                                    <ul class="list-unstyled list-inline rating mb-0 text-center ">
                                        <li class="list-inline-item mr-0"><i class="fas fa-star amber-text"> </i></li>
                                        <li class="list-inline-item mr-0"><i class="fas fa-star amber-text"></i></li>
                                        <li class="list-inline-item mr-0"><i class="fas fa-star amber-text"></i></li>
                                        <li class="list-inline-item mr-0"><i class="fas fa-star amber-text"></i></li>
                                        <li class="list-inline-item"><i class="fas fa-star-half-alt amber-text"></i></li>
                                        <li class="list-inline-item"><p class="text-muted">{book.Rating}</p></li>
                                    </ul>
                                </div>
                                <div class="text-center">
                                    {book.Reviews}
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