import React from 'react';
import { useState, useEffect } from 'react'
import './IndividualBook.css';
import 'mdbreact/dist/css/mdb.css'
import { MDBBtn, } from 'mdbreact';
import { useAuth } from '../../../Private page/Context/AuthContext';
import ReactStars from "react-rating-stars-component";
import style from '../../../../../node_modules/sweetalert-react/node_modules/sweetalert/dist/sweetalert.css'
import swal from '@sweetalert/with-react'


const IndividualBookDetails = ({ bookData, setData }) => {
    const { user } = useAuth();
    const loggedUser = user.sub;
    const bookId = bookData.id;
    const borrower = bookData.Borrower;
    const [error, setError] = useState(null);
    const [bookHistory, setBookHistory] = useState(false);

    const borrowBoook = async () => {

        const ids = {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer  ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json'
            },
        };
        try {
            const data = await fetch(`http://localhost:4000/books/${bookId}`, ids);
            const updatedData = await data.json();
            setData(updatedData.book[0])
        } catch (error) {
            return error.message;
        }
    }

    const returnBoook = async () => {

        const settings = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer  ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json'
            },
        };
        try {
            const data = await fetch(`http://localhost:4000/books/${bookId}`, settings);
            const updatedData = await data.json();
            setData(updatedData.book[0])
        } catch (error) {
            return error.message;
        }
    };



    const sendRating = async (bookId, ratingValue) => {

        const settings = {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer  ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ rating: ratingValue })
        };
        try {
            const data = await fetch(`http://localhost:4000/books/${bookId}/rate`, settings);

            const json = await data.json()
            if (json.message) {
                const modal = await swal({
                    title: "Thank you!",
                    text: `${json.message}`,
                    icon: "success",
                    button: "Ok"
                })
            }

            const newData = json.book[0];
            setData(newData)

        } catch (error) {
            return error.message;
        }
    };


    useEffect(() => {
        fetch(`http://localhost:4000/books/${bookId}/history`, {
            mode: 'cors',
            headers: {
                'Authorization': `Bearer  ${localStorage.getItem("token")}`,
            },
        })
            .then(res => res.json())
            .then(data => setBookHistory(data))
            .catch((error) => (setError(console.error.message)));
    }, [bookData]);




    const stars = {
        size: 40,
        count: 5,
        isHalf: false,
        value: 0,
        color: "grey",
        activeColor: "yellow",
        onChange: newValue => (sendRating(bookId, newValue))
    };


    const popUp = () => swal({
        title: "Please, provide your rating value",
        buttons: {
            cancel: "Close",
        },
        content: (
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <ReactStars {...stars} />
            </div>
        )
    })


    return (

        <div id="book-details" className="container my-5 z-depth-1">
            <section className="black-text">

                <div className="row d-flex ">
                    <div className="col-md-4 justify-content-center">
                        <img src={bookData.Cover} className="w-100 p-4 justify-content-center" alt="smaple image" />
                    </div>
                    <div className="col-md-8 p-3 ">
                        <div className="p-2 ">
                            <h4 className="font-weight-bold text-center">{bookData.Title}</h4>
                        </div>
                        <div className="p-4 text-center text-justify ">
                            <div> 
                                <i class="fas fa-pen-nib"></i>
                                <span className="font-weight-bolder" > Written by:</span>  {bookData.Author}</div>
                        </div>
                        <div className="p-1 text-center text-justify ">
                            <div className="p-1 text-center text-justify" style={{display: 'flex', justifyContent: 'center'}}>
                                <ReactStars
                                    size={40}
                                    count={5}
                                    isHalf={false}
                                    value={bookData.Rating}
                                    color={"grey"}
                                    activeColor={"yellow"}
                                    edit={false}
                                />
                            </div>
                        </div>
                        <div className="p-3 text-center text-justify bold ">
                            <div>
                            <span className="font-weight-bolder" > Status:</span>  {bookData.Status}</div>
                        </div>
                        <div className="p-4">
                            <p className="text-center text-justify" >{bookData.Description}</p>
                        </div>

                        <div id="buttons" className="text-center p-5">
                            {bookData.Status === "Free" &&
                                (<MDBBtn id="main-button" onClick={borrowBoook}> Borrow </MDBBtn>)}

                            {bookData.Status === "Borrowed" && loggedUser === borrower && (
                                <MDBBtn id="main-button" onClick={returnBoook}> Return </MDBBtn>)}
                            {bookHistory && (
                                <MDBBtn id="main-button" className="rate-button" onClick={popUp}> Rate </MDBBtn>)}
                        </div>


                    </div>
                </div>


            </section>
        </div>

    )
};

export default IndividualBookDetails;






