import { MDBCol } from 'mdbreact';
import React from 'react';
import CreateReview from './CreateReview/CreateReview';
import IndividualBookReviewsDisplay from './IndividualBookReviewsDisplay';

const AllReviews = ({ data, update, remove, create, sync, sendLikeOrDislike }) => {
    if (data.message) {

        return (
            <div id="container-reviews" className="container my-5 z-depth-1" >

                <section className="dark-grey-text text-center ">
                    <h4 className="p-5" > This book has no reviews... </h4>
                    <MDBCol className="p-2">
                        <CreateReview create={create} sync={sync} />
                    </MDBCol>
                </section>
            </div>

        )
    }
    
    return (
        <div id="container-reviews" className="container my-5 z-depth-1" >
            <section className="dark-grey-text">
                <h4 className="p-3 white-text" > Reviews... <span> <i class="fas fa-pen fa-xs"></i></span> </h4>

             
                <MDBCol className="reviewRow">
                    {data.map((review) => <IndividualBookReviewsDisplay
                        author={review.Author}
                        author_id={review.Author_Id}
                        content={review.Review}
                        likes={review.Likes}
                        dislikes={review.Dislikes}
                        update={update}
                        remove={remove}
                        sendLikeOrDislike={sendLikeOrDislike}
                        id={review.review_id}
                        key={review.review_id} />)}
                </MDBCol>
                <MDBCol className="p-2">
                    <CreateReview create={create} sync={sync} />
                </MDBCol>
            </section>
        </div>

    )

}

export default AllReviews;