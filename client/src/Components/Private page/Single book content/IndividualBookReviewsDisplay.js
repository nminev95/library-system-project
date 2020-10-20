import React from 'react';
import './IndividualBook.css';
import 'mdbreact/dist/css/mdb.css';
import {MDBRow, MDBContainer, MDBCol} from 'mdbreact';




const IndividualBookReviewsDisplay = ({ review, likes, dislikes, author }) => {

    return (

        <div id="review-details" className="pt-2 pb-2" >
            <MDBContainer className="block-example border border-grey p-3" className="single-review" >
                <MDBRow >
                <MDBCol className="author"> {author}</MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol  className="text-left" md="8">{review}</MDBCol>
                    <MDBCol  className="text-right"md="2">Likes: {likes}</MDBCol>
                    <MDBCol className="text-right" md="2">Dislikes: {dislikes}</MDBCol>
                   
                </MDBRow>
            </MDBContainer>
        </div>        
    )
};



export default IndividualBookReviewsDisplay;