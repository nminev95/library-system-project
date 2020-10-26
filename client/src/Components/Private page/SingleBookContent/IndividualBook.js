import React from 'react';
import IndividualBookDetails from './IndividualBookDetails';
import { useState, useEffect } from 'react';
import IndividualBookReviewsDisplay from './IndividualBookReviewsDisplay';
import { MDBCol, MDBInput } from 'mdbreact';
import CreateReview from './CreateReview/CreateReview';
import AllReviews from './AllReviews/AllReviews';

const IndividualBook = props => {
    const { id } = props.match.params;


    const [bookData, setBookData] = useState('');
    const [bookReviewsData, setBookReviewsData] = useState([]);
    const [error, setError] = useState(null);

    const updateReviews = (records) => {
        setBookReviewsData(records)
    }

    useEffect(() => {
        fetch(`http://localhost:4000/books/${id}`, { mode: 'cors' })
            .then(res => res.json())
            .then(data => setBookData(data[0]))
            .catch((error) => (setError(console.error.message)));
    }, []);


    useEffect(() => {
        fetch(`http://localhost:4000/books/${id}/reviews`, {
            mode: 'cors',
            headers: {
                'Authorization': `Bearer  ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
            .then(data => setBookReviewsData(data))
            .catch((error) => (setError(console.error.message)));
    }, [bookReviewsData.length]);

    const createReview = (reviewData) => {
        fetch(`http://localhost:4000/books/${id}/reviews`, {
            method: 'POST',
            body: JSON.stringify(reviewData),
            headers: {
                'Authorization': `Bearer  ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                setBookReviewsData([...bookReviewsData, data])
            })
            .catch((err) => console.log(err));
      };

    const updateReview = (review_id, newContent) => {
        fetch(`http://localhost:4000/books/${id}/reviews/${review_id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer  ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newContent),
        })
            .then((res) => res.json())
            .then((updatedReview) => {
                const index = bookReviewsData.findIndex((review) => review.review_id === updatedReview.review_id);
                const copy = [...bookReviewsData];
                copy[index] = updatedReview;

                setBookReviewsData(copy);
            })
            .catch((error) => (setError(console.error.message)));
    };


    const removeReview = (review_id) => {

        fetch(`http://localhost:4000/books/${id}/reviews/${review_id}`,
            {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer  ${localStorage.getItem("token")}`,
                    'Content-Type': 'application/json'
                },
            })
            .then((res) => res.json())
            .then(() =>
                setBookReviewsData((reviews) => reviews.filter((review) => review.review_id !== review_id)))
            .catch((error) => (setError(console.error.message)));
    };



    // const Reviews = Data => {
    //     if (Data.message) {

    //         return (
    //             <div id="container-reviews" className="container my-5 z-depth-1" >

    //                 <section className="dark-grey-text text-center ">
    //                     <h4 className="p-5" > This book has no reviews... </h4>
    //                 </section>
    //             </div>

    //         )
    //     } else {

    //         return (
    //             <div id="container-reviews" className="container my-5 z-depth-1" >

    //                 <section className="dark-grey-text">
    //                     <h4 className="p-3 white-text" > Reviews </h4>
    //                     <MDBCol className="reviewRow">
    //                         {Data.map((review) => <IndividualBookReviewsDisplay
    //                             author={review.Author}
    //                             content={review.Review}
    //                             likes={review.Likes}
    //                             dislikes={review.Dislikes}
    //                             update={(updateData) => updateReview(review.review_id, updateData)}
    //                             remove={() => removeReview(review.review_id)}
    //                             key={review.review_id} />)}
    //                     </MDBCol>
    //                     <MDBCol className="p-2">
    //                         <CreateReview create={createReview} />
    //                     </MDBCol>
    //                 </section>
    //             </div>

    //         )
    //     }
    // }




    return (
        <div>
            <IndividualBookDetails bookData={bookData} />
            <div>
            <AllReviews data={bookReviewsData}
            update={updateReview}
            remove={removeReview}
            create={createReview}/> 
                {/* {Reviews(bookReviewsData)} */}
            {/* <CreateReview create={createReview}/> */}
            </div>
        </div>


    )
}
export default IndividualBook;

