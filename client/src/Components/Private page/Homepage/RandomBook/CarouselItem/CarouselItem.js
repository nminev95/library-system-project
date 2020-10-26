import React from 'react';
import { MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBView, MDBContainer } from 'mdbreact';

const CarouselItem = ({ book, count }) => {
    
    return (

        <MDBCarouselItem itemId={count}>
            <MDBView className="carrouselRow">
                <div className="sliderImageContainer">
                    <img src={book.Cover} />
                </div>
                <div className="sliderTextContainer">
                    <h1>{book.Title}</h1>
                    <h2>{book.Author}</h2>
                    <h3>{book.Genre}</h3>
                    <h4>{book.Year}</h4>
                </div>
            </MDBView>
        </MDBCarouselItem>
    )
}

export default CarouselItem;