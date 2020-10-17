import React from 'react';
import SingleBook from './Single_book';
import {useState, useEffect} from 'react';

const SingleBookVis = () => {
    const [book, setBook] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        const id = 4;
        fetch(`http://localhost:4000/books/${id}`)
            .then(res => res.json())
            .then(data => setBook(data[0]))
            .catch((error)=>(setError(console.error.message)));
    }, []);
    if (error) {
        return <h3> {error} </h3>;
    }
    return (
        <div> <SingleBook book={book}/></div>
    )
}
export default SingleBookVis;