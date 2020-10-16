import React from 'react';
import Header from '../Components/Private page/Header/Header';
import Books from './Books';
import './HomepageLogged';
import RandomBookRow from './RandomBookRow';
import Footer from '../Components/Private page/Footer/Footer'

const HomepageLogged = () => {
    return (
        <div>
            <Header />
            <RandomBookRow />
            <Books />
            <Footer/>

        </div>
    )
}

export default HomepageLogged;