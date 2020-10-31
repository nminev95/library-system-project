import React, { useContext, useEffect, useState, Component } from 'react';
import { MDBBtn, MDBIcon, MDBInput, MDBCollapse } from 'mdbreact';
import SingleBorrowedBook from '../../BorrowedBooks/SingleBorrowedBook';
import './CollapseButton.css'

const CollapsePage = ({ books }) => {
    const [collapseID, setCollapseID] = useState('')

    const toggleCollapse = () => () => {
        setCollapseID(prevState => !prevState)
    }
    console.log(books)
    return (
        <>
            {books.length !== 0 ? (
                <MDBBtn
                    color="primary"
                    onClick={toggleCollapse()}
                    style={{ marginBottom: "1rem" }}
                >
                    Show all borrowed books
                </MDBBtn>
            ) : (null)}
            <div className="borrowedBooksContainer">
                <MDBCollapse id="basicCollapse" isOpen={collapseID}>
                    <div style={{ display: "grid", gridTemplateColumns: "25% 25% 25% 25%" }}>
                        {books.map((book) => <SingleBorrowedBook style={{ display: "inline-block" }} book={book} key={book.book_Id} />)}
                    </div>
                </MDBCollapse>
            </div>
        </>
    );

}

export default CollapsePage;