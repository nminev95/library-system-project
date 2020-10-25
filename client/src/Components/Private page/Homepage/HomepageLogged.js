import React, { useState, useEffect, useContext } from 'react';
import './HomepageLogged.css';
import Books from './AllBooks/Books';
import RandomBookRow from './RandomBook/RandomBookRow';
import Pagination from './Pagination/Pagination';
import { SearchContext } from '../Context/SearchContext'
import { MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBView, MDBContainer } from
    "mdbreact";
const HomepageLogged = (props) => {
    const { search } = useContext(SearchContext)
    const [book, setBook] = useState('');
    const [books, setBooks] = useState([]);
    const [page, setPage] = useState(1)
    const [booksPerPage, setBooksPerPage] = useState(5)

    const lastPostIndex = page * booksPerPage;
    const firstPostIndex = lastPostIndex - booksPerPage;
    const currentBooks = books.slice(firstPostIndex, lastPostIndex);
    const pages = [];
    for (let i = 1; i <= Math.ceil(books.length / booksPerPage); i++) {
        pages.push(i);
    }

    useEffect(() => {
        // const id = Math.ceil(Math.random() * 3)
        fetch(`http://localhost:4000/books/2`)
            .then(res => res.json())
            .then(data => setBook(data[0]))
    }, []);

    useEffect(() => {
        fetch(`http://localhost:4000/books`)
            .then(res => res.json())
            .then(data => setBooks(data))
    }, []);

    const paginate = (pageNum) => setPage(pageNum);

    return (
        <div>
            {/* <RandomBookRow book={book} /> */}
            <CarouselPage />
            <Books books={currentBooks} />
            <Pagination paginate={paginate} pages={pages} currentPage={page} />
        </div>
    )
}

export default HomepageLogged;

const CarouselPage = () => {
    return (
        <MDBContainer style={{ width: "100%", maxWidth: "100%", padding: "0", background: "lightgray" }}>
            <MDBCarousel
                activeItem={1}
                length={2}
                showControls={true}
                showIndicators={true}
                className="z-depth-1"
            >
                <MDBCarouselInner className="slider">
                    <MDBCarouselItem itemId="1">
                        <MDBView className="carrouselRow">
                            <div className="sliderImageContainer">
                                <img src="https://edit.org/images/cat/book-covers-big-2019101610.jpg" />
                            </div>
                            <div className="sliderTextContainer">
                                "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
                            </div>
                            {/* className="d-block w-100"
                src="https://mdbootstrap.com/img/Photos/Slides/img%20(130).jpg"
                alt="First slide"
             */}
                        </MDBView>
                    </MDBCarouselItem>
                    <MDBCarouselItem itemId="2">
                        <MDBView className="carrouselRow">
                            <div className="sliderImageContainer" >
                                <img src="https://marketplace.canva.com/EAD7WWWtKSQ/1/0/251w/canva-purple-and-red-leaves-illustration-children%27s-book-cover-hNI7HYnNVQQ.jpg" />
                            </div>
                            <div className="sliderTextContainer">
                       
                                "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"
                            </div>
                            {/* <img
                className="d-block w-100"
                src="https://mdbootstrap.com/img/Photos/Slides/img%20(129).jpg"
                alt="Second slide"
              /> */}
                        </MDBView>
                    </MDBCarouselItem>
                    <MDBCarouselItem itemId="3">
                        <MDBView className="carrouselRow">
                            <div style={{ width: '50%' }}>
                                <label>hahahahah</label>
                                <img src="https://edit.org/images/cat/book-covers-big-2019101610.jpg" />
                            </div>
                            <div>

                            </div>
                            {/* <img
                className="d-block w-100"
                src="https://mdbootstrap.com/img/Photos/Slides/img%20(70).jpg"
                alt="Third slide"
              /> */}
                        </MDBView>
                    </MDBCarouselItem>
                </MDBCarouselInner>
            </MDBCarousel>
        </MDBContainer>
    );
}
