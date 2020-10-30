import React, { createContext } from 'react';
import IndividualBookDetails from './IndividualBookDetails';
import { useState, useEffect } from 'react';
import AllReviews from '../AllReviews/AllReviews';


const IndividualBook = props => {
    const { id } = props.match.params;
    // const LikesDislikesContext = createContext({
    //     likes: 
    // })

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
        console.log(reviewData)
        console.log(id)
        fetch(`http://localhost:4000/books/${id}/reviews`, {
            method: 'POST',
            body: JSON.stringify(reviewData),
            headers: {
                'Authorization': `Bearer  ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((data) => setBookReviewsData([...bookReviewsData, data]))
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

    const sendLikeOrDislike = (review_id, content) => {
        fetch(`http://localhost:4000/reviews/${review_id}/vote`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer  ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(content),
        })
            .then((res) => res.json())

            .catch((error) => (setError(console.error.message)));

    }

   
    const mapped = new Map();

    
    bookReviewsData.map((review) => {
        if (!mapped.has(review.review_id)) {
            mapped.set(review.review_id, {
                Author: review.Author,
                Author_Id: review.Author_Id,
                Book: review.Book,
                Dislikes: review.Dislikes,
                Likes: review.Likes,
                Review: review.Review,
                review_id: review.review_id
            })
        }
    })

    const newData = ([...mapped.values()])

        return (
            <div>
                <IndividualBookDetails bookData={bookData} setData={setBookData} />
                <div>
                    <AllReviews data={newData}

                        update={updateReview}
                        remove={removeReview}
                        sendLikeOrDislike={sendLikeOrDislike}
                        create={createReview} />
                </div>
            </div>


        )
    }
export default IndividualBook;

