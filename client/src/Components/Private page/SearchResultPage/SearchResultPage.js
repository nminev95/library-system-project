import React, { useContext, useState, useEffect } from 'react';
import { MDBRow } from 'mdbreact';
import { SearchContext } from '../Context/SearchContext';
import SingleBookDisplay from '../Homepage/SingleBookDisplay/SingleBookDisplay'

const SearchResultPage = () => {

    const [books, setBooks] = useState([]);
    const { search } = useContext(SearchContext);

    useEffect(() => {
        fetch(`http://localhost:4000/books?search=${search}`)
            .then(res => res.json())
            .then(data => setBooks(data))
    }, []);


    return (
        <div>
            <h1>Search results for: {search} </h1>
            <MDBRow className="bookRow">
                {books.map((book) => <SingleBookDisplay book={book} key={book.id} />)}
            </MDBRow>
        </div>
    )
}

export default SearchResultPage;