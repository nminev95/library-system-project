import React, { useEffect, useState } from 'react';
import './RandomBookRow.css'

const RandomBookRow = () => {

    const [book, setBook] = useState('');

    useEffect(() => {
        const id = Math.ceil(Math.random() * 8)
        fetch(`http://localhost:4000/books/${id}`)
            .then(res => res.json())
            .then(data => setBook(data[0]))
    }, []);

    return (
        <div className="randomBookContainer">
            <div id="bookImage">
                <img id="book1" src={book.Cover}></img>
            </div>
            <div id="bookInfo">
                <div id="bookParams">
                    <h1>{book.Title}</h1>
                    <h2>{book.Author}</h2>
                    <h3>{book.Genre}</h3>
                    <h4>{book.Year}</h4>
                    <h5>{book.Description}</h5>
                    <h5>Status: {book.Status}</h5>
                    <h5>{book.Rating}</h5>
                    <h5>Borrowed: {book.TimesBorrowed} times</h5>
                    <button>Learn more</button>
                </div>
            </div>
        </div>
    )
}

export default RandomBookRow;