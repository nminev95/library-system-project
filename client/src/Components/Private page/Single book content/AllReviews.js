import React from 'react';
import IndividualBookReviewsDisplay from './IndividualBookReviewsDisplay';
import { MDBCol, MDBInput } from 'mdbreact';
import './IndividualBook.css';

const Reviews = ({ bookReviewsData }) => {
    if (bookReviewsData.message) {
       
        return (
            <div id="container-reviews" className="container my-5 z-depth-1" >

                <section className="dark-grey-text text-center ">
                    <h4 className="p-5" > This book has no reviews... </h4>
                </section>
            </div>

        )
    } else {

        return (
            <div id="container-reviews" className="container my-5 z-depth-1" >

                <section className="dark-grey-text">
                    <h4 className="p-3" > Reviews </h4>
                    <MDBCol className="reviewRow">
                        {bookReviewsData.map((review) => <IndividualBookReviewsDisplay author={review.Author} review={review.Review} likes={review.Likes} dislikes={review.Dislikes} key={review.id} />)}
                    </MDBCol>
                    <MDBCol className="p-2">
                        <MDBInput type="textarea" label="Leave your review here..." rows="2" />
                    </MDBCol>
                </section>
            </div>

        )
    }
}
export default Reviews;
