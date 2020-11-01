import React, { useState } from 'react';
import { MDBInput, MDBBtn, MDBContainer } from "mdbreact";
import { Link, useHistory } from 'react-router-dom';
import swal from 'sweetalert';

const EditReviewPage = (props) => {
    
    const history = useHistory();
    const [reviewText, setReviewText] = useState(props.location.state.content);

    const editReview = (id, reviewId) => {

        fetch(`http://localhost:4000/admin/books/${id}/reviews/${reviewId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`,

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
                swal({
                    title: "Success!",
                    text:"Review was successfully updated.", 
                    icon: "success",
                    buttons:false,
                    timer: 1500,
                });
                history.push('/admin/reviews')
            })
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