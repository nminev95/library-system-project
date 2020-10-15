import React from 'react';
import './SingleBookDisplay.css'

const SingleBookDisplay = ({ book }) => {
 
    return (
        <div className="books">
            <div className="bookImage">
                <img src={book.Cover}></img>
            </div>
            <h2>{book.Title}</h2>
            <h5>{book.Author}</h5>
            <p>{book.Genre}</p>
            <p>{book.Year}</p>
            <p>{book.Status}</p>
            <p>{book.Rating}</p>
        </div>
    )
}

export default SingleBookDisplay;