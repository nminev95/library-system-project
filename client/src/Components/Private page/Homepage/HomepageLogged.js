import React, { useState, useEffect, useContext } from 'react';
import './HomepageLogged';
import Books from './AllBooks/Books';
import RandomBookRow from './RandomBook/RandomBookRow';
import Pagination from './Pagination/Pagination';
import { SearchContext } from '../Context/SearchContext'

const HomepageLogged = (props) => {
    const { search } = useContext(SearchContext)
    const [book, setBook] = useState('');
    const [books, setBooks] = useState([]);
    const [page, setPage] = useState(1)
    const [booksPerPage, setBooksPerPage] = useState(5)

    const lastPostIndex = page * booksPerPage;
    const firstPostIndex = lastPostIndex - booksPerPage;
    const currentBooks = books.slice(firstPostIndex, lastPostIndex);
    const pages = [];
    for (let i = 1; i <= Math.ceil(books.length / booksPerPage); i++) {
        pages.push(i);
    }

    useEffect(() => {
        // const id = Math.ceil(Math.random() * 3)
        fetch(`http://localhost:4000/books/2`)
            .then(res => res.json())
            .then(data => setBook(data[0]))
    }, []);

    useEffect(() => {
        fetch(`http://localhost:4000/books`)
            .then(res => res.json())
            .then(data => setBooks(data))
    }, []);

    const paginate = (pageNum) => setPage(pageNum);

    return (
        <div>
            <RandomBookRow book={book} />
            <Books books={currentBooks} />
            <Pagination paginate={paginate} pages={pages} currentPage={page} />
        </div>
    )
}

export default HomepageLogged;