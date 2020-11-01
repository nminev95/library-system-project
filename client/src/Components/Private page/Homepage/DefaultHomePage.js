import React, { useState, useEffect } from 'react';
import Books from './AllBooks/Books';
import BooksCarousel from './RandomBook/BooksCarousel';
import { Link } from 'react-router-dom';
import { MDBBtn } from 'mdbreact';

const DefaultHomePage = (props) => {
    const [topBooks, setTopBooks] = useState([]);
    const [latestBooks, setLatestBooks] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:4000/books/latest`, {
            mode: 'cors',
            headers: {
                'Authorization': `Bearer  ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json',
            }
        }
        )
            .then(res => res.json())
            .then(data => {
                setTopBooks(data.slice(0, 3))
                setLatestBooks(data.slice(data.length - 6, data.length))
            })
    }, []);
   
    return (
        <div style={{textAlign:"center"}}>
            {topBooks && <BooksCarousel books={topBooks} />}  
            <h2 style={{margin: "40px"}}>Newest books</h2>
            {latestBooks && <Books books={latestBooks} />}
            <Link to="/books?page=1">
            <MDBBtn>Browse all books</MDBBtn>
            </Link>
        </div>
    )
}

export default DefaultHomePage;