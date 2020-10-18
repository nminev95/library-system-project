import React from 'react';
import SingleBookDisplay from '../SingleBookDisplay/SingleBookDisplay';
import { MDBRow } from 'mdbreact';
import './Books.css'

const Books = (props) => {

    return (
        <MDBRow className="bookRow">
            {props.books.map((book) => <SingleBookDisplay book={book} key={book.id} />)}
        </MDBRow>
    )
}

export default Books;