import React from 'react';
import SingleBookDisplay from '../SingleBookDisplay/SingleBookDisplay';

const Books = (props) => {

    return (
        <div className="singleBook">
            {props.books.map((book) => <SingleBookDisplay book={book} key={book.id} />)}
        </div>
    )
}

export default Books;