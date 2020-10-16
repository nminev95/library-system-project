import React from 'react';
import './Single_book.css';
import image from './lord_of_the_rings.jpg'
import Button from 'react-bootstrap/Button'


const SingleBook = () => {

    return (
        <div className="body">
            <div id="content-container">
                <div id="book-img">
                    <img src={image} />
                </div>
                < div >
                    <p> Rating: 5 </p>

                    <Button id="borrow-button" variant="success">Borrow</Button>{' '}
                </div>
                <div id="title">
                    <h2 >Lord of the rings</h2>
                </div>
                <div id="description">
                    <p > The Lord of the Rings, fantasy novel by J.R.R. Tolkien initially published in three parts as The Fellowship of the Ring (1954), The Two Towers (1955), and The Return of the King (1955). The novel, set in the Third Age of Middle-earth, formed a sequel to Tolkien’s The Hobbit (1937) and was succeeded by his posthumous The Silmarillion (1977). The Lord of the Rings is the saga of a group of sometimes reluctant heroes who set forth to save their world from consummate evil. Its many worlds and creatures were drawn from Tolkien’s extensive knowledge of philology and folklore. </p>
                </div>
                <div id="reviews" >
                    <p>THE BEST BOOK EVER</p>
                </div>
            </div>
        </div>
    )
}

export default SingleBook;