import React from 'react';
import { MDBRow } from 'mdbreact';
import SingleBorrowedBook from './SingleBorrowedBook';

const BorrowedBooks = (props) => {
    return (
        <div>
            <p5 className = "text-center">Your borrowed books...</p5>
            <div className="bookRow">
                {props.books.map((book) => <SingleBorrowedBook book={book} key={book.id} />)}
            </div>
        </div>

    )
};



export default BorrowedBooks;