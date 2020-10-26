import React, { useContext, useState, useEffect } from 'react';
import { MDBRow } from 'mdbreact';
import SingleBookDisplay from '../Homepage/SingleBookDisplay/SingleBookDisplay'
import { useCustomQueryParams } from '../../Utils/Loader/CustomHooks/useCustomQueryParams';

const SearchResultPage = () => {

    const [books, setBooks] = useState([]);
    const queryParams = useCustomQueryParams();

    useEffect(() => {
        fetch(`http://localhost:4000/books?search=${queryParams.query}`)
            .then(res => res.json())
            .then(data => setBooks(data))
    }, []);


    return (
        <div>
            <h1>Search results for: {queryParams.query} </h1>
            <MDBRow className="bookRow">
                {books.map((book) => <SingleBookDisplay book={book} key={book.id} />)}
            </MDBRow>
        </div>
    )
}

export default SearchResultPage;