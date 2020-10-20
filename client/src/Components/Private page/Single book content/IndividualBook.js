import React from 'react';
import IndividualBookDetails from './IndividualBookDetails';
import Reviews from './AllReviews';
import {useState, useEffect} from 'react';

const IndividualBook = props => {
    const [bookData, setBookData] = useState('');
    const [bookReviewsData, setBookReviewsData] = useState([]);
    const {id} = props.match.params;
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:4000/books/${id}`, {mode: 'cors'})
            .then(res => res.json())
            .then(data => setBookData(data[0]))
            .catch((error)=>(setError(console.error.message)));
    }, [id]);
  

    useEffect(() => {
        fetch(`http://localhost:4000/books/${id}/reviews`, {mode: 'cors'})
            .then(res => res.json())
            .then(data => setBookReviewsData(data))
            .catch((error)=>(setError(console.error.message)));
        }, [id]);
        if (error) {
            return <h3> {error} </h3>;
        }
    return (
        <div>
         <IndividualBookDetails bookData={bookData}/>
         <Reviews bookReviewsData={bookReviewsData}/>   
         </div>
    )
}
export default IndividualBook;