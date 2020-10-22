import React, { useState } from 'react';
import { MDBInput, MDBBtn, MDBContainer } from "mdbreact";
import { Link } from 'react-router-dom';

const EditReviewPage = (props) => {
    console.log(props.location.state.bookId)

    const [reviewText, setReviewText] = useState(props.location.state.content);

    const editReview = (id, reviewId) => {

        fetch(`http://localhost:4000/admin/books/${id}/reviews/${reviewId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                content: reviewText
            }),
        })
            .then(r => r.json())
            .then(result => {
                if (result.error) {
                    throw new Error(result.error);
                }
            })
        //.catch(error => setError(error.message));
    };



    return (
        <>
            <Link to="/admin/reviews">
                <MDBBtn style={{ margin: "20px" }}>Back to all reviews</MDBBtn>
            </Link>
            <MDBContainer>
                <MDBInput type="textarea" value={reviewText} onChange={(ev) => setReviewText(ev.target.value)} label="Review text" rows="5" />
            </MDBContainer>
            <MDBBtn style={{ margin: "20px", float: "right" }} onClick={() => editReview(props.location.state.bookId, props.location.state.id)}>Save changes</MDBBtn>
        </>
    )
}

export default EditReviewPage;