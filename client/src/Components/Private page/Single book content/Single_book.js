import React from 'react';
import './Single_book.css';
import 'mdbreact/dist/css/mdb.css'


const SingleBook = () => {

    return (
        <div id="book-details" class="container my-5 z-depth-1">


            <section class="dark-grey-text">

                <div class="row pr-lg-5">
                    <div class="col-md-7 mb-4">

                        <div class="view">
                            <img src="https://mdbootstrap.com/img/illustrations/graphics(4).png" class="img-fluid" alt="smaple image" />
                        </div>

                    </div>
                    <div class="col-md-5 d-flex align-items-center">
                        <div>

                            <h3 class="font-weight-bold mb-4 text-center">Material Design Blocks</h3>

                            <p class="text-center" class="text-justify">Lorem ipsum dolor sit amet consectetur adip elit. Maiores deleniti explicabo voluptatem quisquam nulla asperiores aspernatur aperiam voluptate et consectetur minima delectus, fugiat eum soluta blanditiis adipisci, velit dolore magnam.</p>

                            <div>
                            <ul class="list-unstyled list-inline rating mb-0 text-center ">
                                <li class="list-inline-item mr-0"><i class="fas fa-star amber-text"> </i></li>
                                <li class="list-inline-item mr-0"><i class="fas fa-star amber-text"></i></li>
                                <li class="list-inline-item mr-0"><i class="fas fa-star amber-text"></i></li>
                                <li class="list-inline-item mr-0"><i class="fas fa-star amber-text"></i></li>
                                <li class="list-inline-item"><i class="fas fa-star-half-alt amber-text"></i></li>
                                <li class="list-inline-item"><p class="text-muted">4.5</p></li> 
                            </ul>
                            </div>
                            <div class="text-center" >
                            <button  type="button" class=" text-center btn btn-green btn-rounded mx-15 ">Borrow</button>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
        </div>
    )
};

export default SingleBook;