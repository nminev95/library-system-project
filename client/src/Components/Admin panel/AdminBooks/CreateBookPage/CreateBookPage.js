import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { MDBInput, MDBBtn, MDBContainer } from "mdbreact";
import BookStatusDropdown from '../EditBookPage/BookStatusDropdown/BookStatusDropdown';
import swal from 'sweetalert';

const CreateBookPage = () => {

    const [bookTitle, setBookTitle] = useState('');
    const [bookAuthor, setBookAuthor] = useState('');
    const [bookGenre, setBookGenre] = useState('e.g. Horror');
    const [bookYear, setBookYear] = useState('e.g. 1999');
    const [bookStatus, setBookStatus] = useState('');
    const [bookDescription, setBookDescription] = useState('');
    const [bookCover, setBookCover] = useState('Enter cover URL address')
    const history = useHistory();
    const book = {
        title: bookTitle,
        author: bookAuthor,
        description: bookDescription,
        genre: bookGenre,
        year: bookYear,
        status: bookStatus,
        cover: bookCover
    }
    
    const createBook = async (book) => {
    
        const settings = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer  ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(book)
        };
        try {
            const data = await fetch(`http://localhost:4000/admin/books`, settings);
            swal({
                title: "Success!",
                text:"Book was successfully created.", 
                icon: "success",
                buttons:false,
                timer: 1500,
            });
            history.push('/admin/books')
        } catch (e) {
            return e;
        }
    }

    return (

        <>
            <Link to="/admin/books">
                <MDBBtn style={{ margin: "20px" }}>Back to all books</MDBBtn>
            </Link>
            <MDBContainer>
                <MDBInput label="Book title" value={bookTitle} onChange={(ev) => setBookTitle(ev.target.value)} />
                <MDBInput label="Book author" value={bookAuthor} onChange={(ev) => setBookAuthor(ev.target.value)} />
                <MDBInput label="Book genre" value={bookGenre} onChange={(ev) => setBookGenre(ev.target.value)} />
                <MDBInput label="Book year" value={bookYear} onChange={(ev) => setBookYear(ev.target.value)} />
                <BookStatusDropdown currStatus={bookStatus} changeStatus={(status) => setBookStatus(status)} />
                <MDBInput type="textarea" value={bookDescription} onChange={(ev) => setBookDescription(ev.target.value)} label="Book description" rows="5" />
                <MDBInput label="Book cover" value={bookCover} onChange={(ev) => setBookCover(ev.target.value)} />
            </MDBContainer>
            <MDBBtn style={{ margin: "20px", float: "right" }} onClick={() => createBook(book)}>Add book to library</MDBBtn>
        </>
    )
}

export default CreateBookPage;