import React, { useState, useEffect, useContext, Fragment } from 'react';
import './ExploreBooksView.css';
import Books from './AllBooks/Books';
import Pagination from './Pagination/Pagination';
import BooksCarousel from './RandomBook/BooksCarousel';
import SideDrawer from './SideDrawer/SideDrawer';
import { useCustomQueryParams } from '../../Utils/Loader/CustomHooks/useCustomQueryParams';
import { Link, useHistory } from 'react-router-dom';
import { MDBBtn } from 'mdbreact';

const HomepageLogged = (props) => {
    const [stateData, setStateData] = useState([]);
    const { page } = useCustomQueryParams();
    const [genres, setGenres] = useState([]);
    const history = useHistory();

    useEffect(() => {
        fetch(`http://localhost:4000/books${history.location.search}`, {
            mode: 'cors',
            headers: {
                'Authorization': `Bearer  ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(data => setStateData(data))
    }, [history.location.search]);

    useEffect(() => {
        fetch('http://localhost:4000/books/genres', {
            mode: 'cors',
            headers: {
                'Authorization': `Bearer  ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(data => setGenres(data))
    }, []);

    return (
        <div>
            <div style={{ display: "grid", gridTemplateColumns: "15% 85%", background: "#EDEDEE" }}>
                <div>
                    <SideDrawer genres={genres} page={page} />
                </div>
                <div>
                    {stateData.books && <Books books={stateData.books} />}
                    {stateData.books && stateData.books.length === 0 ?
                        (<div style={{height: '650px'}}>
                            <h2 style={{ minHeight: "100%" }}>No books were found matching your criteria.</h2>
                        </div>
                        ) : (null)}
                    <Pagination stateData={stateData} />
                </div>
            </div>
        </div>
    )
}

export default HomepageLogged;
