import React from 'react';
import Header from '../Header/Header';
import Books from './AllBooks/Books';
import './HomepageLogged';
import RandomBookRow from './RandomBook/RandomBookRow';


const HomepageLogged = () => {
    return (
        <div>
            <Header />
            <RandomBookRow />
            <Books />

        </div>
    )
}

export default HomepageLogged;