import React from 'react';
import './SingleBookDisplay.css'

const SingleBookDisplay = ({ book }) => {

    return (
        <div className="books">
            <div className="bookImage">
                <img className="imageSize" src={book.Cover}></img>
            </div>
            <div className="allBooksInfo">
                <h2>{book.Title}</h2>
                <h5>{book.Author}</h5>
                <p>{book.Genre}</p>
                <p>{book.Year}</p>
                <p>{book.Rating}</p>
            </div>
        </div>
    )
}

export default SingleBookDisplay;