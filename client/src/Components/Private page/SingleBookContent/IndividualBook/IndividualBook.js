import React, { createContext } from 'react';
import IndividualBookDetails from './IndividualBookDetails';
import { useState, useEffect } from 'react';
import AllReviews from '../AllReviews/AllReviews';
import style from '../../../../../node_modules/sweetalert-react/node_modules/sweetalert/dist/sweetalert.css'
import swal from '@sweetalert/with-react'


const IndividualBook = props => {
    const { id } = props.match.params;
    // const LikesDislikesContext = createContext({
    //     likes: 
    // })

    const [bookData, setBookData] = useState(null);
    const [bookReviewsData, setBookReviewsData] = useState([]);
    const [error, setError] = useState(null);


    const updateReviews = (records) => {
        setBookReviewsData(records)
    }

    useEffect(() => {
        fetch(`http://localhost:4000/books/${id}`, { 
            mode: 'cors',
            headers: {
                'Authorization': `Bearer  ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json',
            }, })
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
            .then((res) => (res.json()))
            .then((data) => {
                if (data.message) {
                    const modal = swal({
                        title: "Oops!",
                        text: `${data.message}`,
                        icon: "error",
                        button: "Ok"
                    })
                }
                if (!bookReviewsData.length) setBookReviewsData([data]);
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


    const sendLikeOrDislike = async  (review_id, content) => {

        const ids = {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer  ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(content),
        };
        try {
            const data = await fetch(`http://localhost:4000/reviews/${review_id}/vote`, ids);
            const updatedData = await data.json();
            // const bookData = (updatedData);
            // console.log(bookData);
        } catch (error) {
            return error.message;
        }
    }


    return (
        <div style={{marginTop: "100px"}}>
            { bookData && < IndividualBookDetails bookData={bookData} setData={setBookData} />}
            <div>
                <AllReviews data={bookReviewsData}

                    update={updateReview}
                    remove={removeReview}
                    sendLikeOrDislike={sendLikeOrDislike}
                    create={createReview} />
            </div>
        </div>


    )
}
export default IndividualBook;

