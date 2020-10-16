import React from 'react';
import './Single_book.css';
import image from './lord_of_the_rings.jpg'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'


const SingleBook = () => {

    return (
        <div>
             <Header/>
             <div id="content-container">
                <div id="book-img">
                    <img src={image} />
                </div>
            </div>
            <Footer/>
        
        </div>
    )
}

export default SingleBook;