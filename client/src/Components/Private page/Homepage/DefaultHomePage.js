import React, { useState, useEffect, useContext, Fragment } from 'react';
import Books from './AllBooks/Books';
import Pagination from './Pagination/Pagination';
import BooksCarousel from './RandomBook/BooksCarousel';
import SideDrawer from './SideDrawer/SideDrawer';
import { useCustomQueryParams } from '../../Utils/Loader/CustomHooks/useCustomQueryParams';
import { Link } from 'react-router-dom';
import { MDBBtn } from 'mdbreact';

const DefaultHomePage = (props) => {
    const [topBooks, setTopBooks] = useState([]);
    const [latestBooks, setLatestBooks] = useState([]);

    // const [stateData, setStateData] = useState([]);
    // const [search, setSearch] = useState('');
    // const { page, query } = useCustomQueryParams();
    // const url = `http://localhost:4000/books?page=${page}`
    // useEffect(() => {
    //     fetch(url, {
    //         mode: 'cors',
    //         headers: {
    //             'Authorization': `Bearer  ${localStorage.getItem("token")}`,
    //             'Content-Type': 'application/json',
    //         }
    //     })
    //         .then(res => res.json())
    //         .then(data => setStateData(data))
    // }, [url]);
    // console.log(stateData)


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
            {/* <div style={{display:"grid", gridTemplateColumns: "10% 80%"}}> */}
            {/* {stateData.books && <Books books={stateData.books} />} */}
            {/* <Pagination stateData={stateData} /> */}
            {/* </div>  */}
            {/* <Pagination paginate={paginate} pages={pages} currentPage={page} /> */}
        </div>
    )
}

export default DefaultHomePage;