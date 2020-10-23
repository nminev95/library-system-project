import React, { useState, useEffect } from 'react';
import BorrowedBooks from './BorrowedBooks';

const ProfileBorrowedBooks = (props) => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:4000/books/user/books`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem("token")}`,
            }
          })
            .then((response) => response.json())
            .then((data) => setBooks(data));
        }, []);

        return (
            <div>
                <BorrowedBooks books = {books}/>
            </div>
        )
    }

    export default ProfileBorrowedBooks;