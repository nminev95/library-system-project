import React from 'react';
import './IndividualBook.css';
import 'mdbreact/dist/css/mdb.css';
import { MDBRow, MDBContainer, MDBCol, MDBBtn, MDBIcon } from 'mdbreact';




const IndividualBookReviewsDisplay = ({ review, likes, dislikes, author }) => {

    return (

        <div id="review-details" className="pt-2 pb-2" >
            <MDBContainer className="block-example border border-grey p-3" className="single-review" >
                <MDBRow >
                    <MDBCol className="author" md="8" pt="2" > {author}</MDBCol>
                    <MDBCol id="edit-delete-buttons" className="text-right" md="4"  >
                        <MDBBtn id="button-check" tag="a" size="sm" color="grey">
                            <MDBIcon icon="check" />
                        </MDBBtn>
                        <MDBBtn  id="button-edit" tag="a" size="sm" color="grey">
                            <MDBIcon icon="pencil-alt" />
                        </MDBBtn>
                        <MDBBtn id="button-trash" tag="a" size="sm" color="grey">
                            <MDBIcon icon="trash-alt" />
                        </MDBBtn>
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol className="text-left" md="8">{review}</MDBCol>
                    <MDBCol className="text-right" md="2">Likes: {likes}</MDBCol>
                    <MDBCol className="text-right" md="2">Dislikes: {dislikes}</MDBCol>

                </MDBRow>
            </MDBContainer>
        </div>
    )
};



export default IndividualBookReviewsDisplay;