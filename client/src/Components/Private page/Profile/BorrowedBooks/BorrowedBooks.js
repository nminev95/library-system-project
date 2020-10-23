import React from 'react';
import {MDBRow} from 'mdbreact';
import SingleBorrowedBook from './SingleBorrowedBook';

const BorrowedBooks = (props) => {
    return (
        <MDBRow className="bookRow">
        {props.books.map((book) => <SingleBorrowedBook book={book} key={book.id} />)}
    </MDBRow>
       
    )
};



export default BorrowedBooks;