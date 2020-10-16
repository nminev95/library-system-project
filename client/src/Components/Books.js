import React, { useState, useEffect } from 'react';
import SingleBookDisplay from './SingleBookDisplay';

const Books = () => {

    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4000/books')
            .then(res => res.json())
            .then(data => setBooks(data))
    }, []);

    return (
        <div className="singleBook">
            {books.map((book) => <SingleBookDisplay book={book} key={book.id} />)}
        </div>
    )
}



export default Books;