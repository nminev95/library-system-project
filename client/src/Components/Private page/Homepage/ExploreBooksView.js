import React, { useState, useEffect, useContext, Fragment } from 'react';
import './ExploreBooksView.css';
import Books from './AllBooks/Books';
import Pagination from './Pagination/Pagination';
import BooksCarousel from './RandomBook/BooksCarousel';
import SideDrawer from './SideDrawer/SideDrawer';
import { useCustomQueryParams } from '../../Utils/Loader/CustomHooks/useCustomQueryParams';
import { Link } from 'react-router-dom';
import { MDBBtn } from 'mdbreact';

const HomepageLogged = (props) => {
    const [stateData, setStateData] = useState([]);
    const [search, setSearch] = useState('');
    const { page, query } = useCustomQueryParams();
    const [genres, setGenres] = useState([]);
    const [currentURL, setCurrentURL] = useState(`http://localhost:4000/books?page=${page}`);
    const [genre, setGenre] = useState('');

    const updateUrl = (url) => {
        setCurrentURL(url)
    }   

    const getGenre = (genre) => {
        setGenre(genre);
    }

    useEffect(() => {
        fetch(currentURL, {
            mode: 'cors',
            headers: {
                'Authorization': `Bearer  ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(data => setStateData(data))
    }, [currentURL]);

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
    },[]);
 
    return (
        <div>
            <div style={{ display: "grid", gridTemplateColumns: "15% 85%", background: "#EDEDEE" }}>
                <div>
                    <SideDrawer genres={genres} page={page} setGenre={getGenre} updateBooks={updateUrl}/>
                </div>
                <div>
                    {stateData.books && <Books books={stateData.books} />}
                    <Pagination stateData={stateData} updateBooks={updateUrl}/>
                </div>
            </div>
        </div>
    )
}

export default HomepageLogged;
