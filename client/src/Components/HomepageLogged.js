import React from 'react';
import Header from '../Components/Private page/Header/Header';
import Books from './Books';
import './HomepageLogged';
import RandomBookRow from './RandomBookRow';

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