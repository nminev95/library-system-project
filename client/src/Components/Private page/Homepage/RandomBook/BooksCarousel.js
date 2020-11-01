import React from 'react';
import './BooksCarousel.css';
import { MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBView, MDBContainer } from 'mdbreact';
import CarouselItem from './CarouselItem/CarouselItem'

const BooksCarousel = ({ books }) => {
    let count = 0;
    
    return (
        
        <MDBContainer style={{ width: "100%", maxWidth: "100%", padding: "0", background: "lightgray" }}>
            <MDBCarousel
                style={{height:"720px"}}
                activeItem={1}
                length={3}
                showControls={true}
                showIndicators={true}
                className="z-depth-1"
                onHoverStop={false}
            >
                <MDBCarouselInner className="slider">
                    {books.map(book => <CarouselItem key={book.id} book={book} count={++count} />)}
                </MDBCarouselInner>
            </MDBCarousel>
        </MDBContainer>
    );
}

export default BooksCarousel;