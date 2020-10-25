import React, { useState } from 'react';
import './IndividualBook.css';
import 'mdbreact/dist/css/mdb.css';
import { MDBRow, MDBContainer, MDBCol, MDBBtn, MDBIcon } from 'mdbreact';




const IndividualBookReviewsDisplay = ({ content, likes, dislikes, author, remove, update }) => {

    const [currentContent, setNewCurrentContent] = useState(content);
    console.log(currentContent);
    const [updateMode, setModeUpdate] = useState(false);

    const toggleUpdateMode = () => {
        setModeUpdate((prevState) => !prevState);
    };

    const saveEdit = () => {
        update({ content: currentContent });
        toggleUpdateMode();
    };

    return (

        <div id="review-details" className="pt-2 pb-2" >
            <MDBContainer className="block-example border border-grey p-3" className="single-review" >
                <MDBRow >
                    <MDBCol className="author" md="8" pt="2" > {author}</MDBCol>
                    <MDBCol id="edit-delete-buttons" className="text-right" md="4"  >

                        {updateMode ? (
                        <MDBBtn id="button-check" tag="a" size="sm" color="grey" onClick={saveEdit}>
                            <MDBIcon icon="check" />
                        </MDBBtn>

                        ) : (
                        <MDBBtn id="button-edit" tag="a" size="sm" color="grey" onClick={toggleUpdateMode}>
                            <MDBIcon icon="pencil-alt" />
                        </MDBBtn>
                        )}
                        <MDBBtn id="button-trash" tag="a" size="sm" color="grey" onClick={remove}>
                            <MDBIcon icon="trash-alt" />
                        </MDBBtn>
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    {updateMode ? (
                        <input className="grey"
                            value={currentContent}
                            onChange={(ev) => setNewCurrentContent(ev.target.value)}
                        />
                    ) : (                       
                    <MDBCol className="text-left" md="8">{currentContent}</MDBCol>
                    )}
                    <MDBCol className="text-right" md="2">Likes: {likes}</MDBCol>
                    <MDBCol className="text-right" md="2">Dislikes: {dislikes}</MDBCol>

                </MDBRow>
            </MDBContainer>
        </div>
    )
};



export default IndividualBookReviewsDisplay;