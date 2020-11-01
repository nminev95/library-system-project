import React from 'react';
import { MDBBtn, MDBCarouselItem, MDBView } from 'mdbreact';
import { useHistory } from 'react-router-dom';

const CarouselItem = ({ book, count }) => {
    const history = useHistory();

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
                    <h5>{book.Rating}</h5>
                    <br></br>
                    <h6>Book has been borrowed {book.TimesBorrowed} times.</h6>
                    <br></br>
                    <h7>{book.Description.slice(0, 80)}....</h7>
                    <br></br>
                    <br></br>
                    <MDBBtn onClick={() => history.push(`/books/${book.id}`)}>Click here to read more</MDBBtn>
                </div>
            </MDBView>
        </MDBCarouselItem>
    )
}

export default CarouselItem;