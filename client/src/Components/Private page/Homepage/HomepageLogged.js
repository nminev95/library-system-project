import React, { useState, useEffect } from 'react';
import './HomepageLogged';
import Header from '../Header/Header';
import Books from './AllBooks/Books';
import RandomBookRow from './RandomBook/RandomBookRow';
import Pagination from './Pagination/Pagination';

const HomepageLogged = (props) => {

    const [book, setBook] = useState('');
    const [books, setBooks] = useState([]);
    const [page, setPage] = useState(1)
    const [booksPerPage, setBooksPerPage] = useState(2)

    const lastPostIndex = page * booksPerPage;
    const firstPostIndex = lastPostIndex - booksPerPage;
    const currentBooks = books.slice(firstPostIndex, lastPostIndex);
    const pages = [];
    for (let i = 1; i <= Math.ceil(books.length / booksPerPage); i++) {
        pages.push(i);
    }

    useEffect(() => {
        const id = Math.ceil(Math.random() * 8)
        fetch(`http://localhost:4000/books/${id}`)
            .then(res => res.json())
            .then(data => setBook(data[0]))
    }, []);

    useEffect(() => {
        fetch(`http://localhost:4000/books`)
            .then(res => res.json())
            .then(data => setBooks(data))
    }, []);


    const paginate = (pageNum) => setPage(pageNum);
    // useEffect(() => {
    //     fetch(`http://localhost:4000/books/pages/${page}`)
    //         .then(res => res.json())
    //         .then(data => setBooks(data))
    // }, [page]);

    return (
        <div>
            <Header />
            <RandomBookRow book={book} />
            <Books books={currentBooks} />
            <Pagination paginate={paginate} pages={pages} currentPage={page}/>
        </div>
    )
}

export default HomepageLogged;