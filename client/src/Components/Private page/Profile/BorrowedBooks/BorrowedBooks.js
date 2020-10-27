import React from 'react';
import { MDBRow } from 'mdbreact';
import SingleBorrowedBook from './SingleBorrowedBook';

const BorrowedBooks = (props) => {
  if(props.books.message) {
      return (
        <div>
            <div className = "text-center">Oops, you have no borrowed books! </div>         
        </div>

    )
  }
    return (
        <div>
            <p4 className = "text-center">Your borrowed books...</p4>
            <div className="bookRow">
                {props.books.map((book) => <SingleBorrowedBook book={book} key={book.id} />)}
            </div>
        </div>

    )
};



export default BorrowedBooks;