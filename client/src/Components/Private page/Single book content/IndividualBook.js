import React from 'react';
import IndividualBookDetails from './IndividualBookDetails';
import {useState, useEffect} from 'react';

const IndividualBook = props => {
    const [bookData, setBookData] = useState('');
    const {id} = props.match.params;
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:4000/books/${id}`, {mode: 'cors'})
            .then(res => res.json())
            .then(data => setBookData(data[0]))
            .catch((error)=>(setError(console.error.message)));
    }, []);
    if (error) {
        return <h3> {error} </h3>;
    }
    return (
         <IndividualBookDetails bookData={bookData}/>
    )
}
export default IndividualBook;