import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MDBInput, MDBBtn, MDBContainer } from "mdbreact";
import BookStatusDropdown from './BookStatusDropdown/BookStatusDropdown';

const EditBookPage = (props) => {


    const [bookTitle, setBookTitle] = useState(props.location.state.title);
    const [bookAuthor, setBookAuthor] = useState(props.location.state.author);
    const [bookGenre, setBookGenre] = useState(props.location.state.genre);
    const [bookStatus, setBookStatus] = useState(props.location.state.status);
    const [bookDescription, setBookDescription] = useState(props.location.state.description);

    const editBook = (id) => {
        
        fetch(`http://localhost:4000/admin/books/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: bookTitle,
                author: bookAuthor,
                description: bookDescription,
                genre: bookGenre,
                status: bookStatus
            }),
        })
            .then(r => r.json())
            .then(result => {
                if (result.error) {
                    throw new Error(result.error);
                }
            })
            //.catch(error => setError(error.message));
    };



return (
    <>
        <Link to="/admin/books">
            <MDBBtn style={{ margin: "20px" }}>Back to all books</MDBBtn>
        </Link>
        <MDBContainer>
            <MDBInput label="Book title" value={bookTitle} onChange={(ev) => setBookTitle(ev.target.value)} />
            <MDBInput label="Book author" value={bookAuthor} onChange={(ev) => setBookAuthor(ev.target.value)} />
            <MDBInput label="Book genre" value={bookGenre} onChange={(ev) => setBookGenre(ev.target.value)} />
            <BookStatusDropdown currStatus={bookStatus} changeStatus={(status) => setBookStatus(status)} />
            <MDBInput type="textarea" value={bookDescription} onChange={(ev) => setBookDescription(ev.target.value)} label="Book description" rows="5" />
        </MDBContainer>
        <MDBBtn style={{ margin: "20px", float: "right" }} onClick={() => editBook(props.location.state.id)}>Save changes</MDBBtn>
    </>
)
}

export default EditBookPage;