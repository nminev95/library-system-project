import React, { useState } from 'react';
import '../IndividualBook/IndividualBook.css';
import 'mdbreact/dist/css/mdb.css';
import { MDBRow, MDBContainer, MDBCol, MDBBtn, MDBIcon } from 'mdbreact';
import { useAuth } from '../../../Private page/Context/AuthContext';



const IndividualBookReviewsDisplay = ({ content, likes, dislikes, author, author_id, remove, update, id, sendLikeOrDislike }) => {
    const { user } = useAuth();
    const loggedUser = user.sub;

    const [isAuthor, setIsAuthor] = useState(author_id === loggedUser ? true : false)
    const [currentContent, setNewCurrentContent] = useState(content);
    const [updateMode, setModeUpdate] = useState(false);
    const [likesNumber, setLikesNumber] = useState(likes);
    const [dislikesNumber, setDislikesNumber] = useState(dislikes);
    const [hasVoted, setHasVoted] = useState(false);

    const toggleUpdateMode = () => {
        setModeUpdate((prevState) => !prevState);
    };

    const saveEdit = () => {
        update(id, { content: currentContent });
        toggleUpdateMode();
    };

    const sendLike = () => {
        setHasVoted(true);
        sendLikeOrDislike(id, { vote: "Like" });
        setLikesNumber((likesNumber) => likesNumber + 1)
        if (hasVoted) {
            setDislikesNumber((dislikesNumber) => dislikesNumber - 1)
        }
    };

    const sendDislike = () => {
        setHasVoted(true);
        sendLikeOrDislike(id, { vote: "Dislike" });
        setDislikesNumber((dislikesNumber) => dislikesNumber + 1)
        if (hasVoted) {
            setLikesNumber((likesNumber) => likesNumber - 1)
        }
    };
    
    return (
        <div id="review-details" className="pt-2 pb-2" >
            <MDBContainer className="block-example border border-grey p-3" className="single-review" >
                <MDBRow >
                    <MDBCol className="author" md="8" pt="2" > {author}</MDBCol>
                    {isAuthor ? (
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
                            <MDBBtn id="button-trash" tag="a" size="sm" color="grey" onClick={() => remove(id)}>
                                <MDBIcon icon="trash-alt" />
                            </MDBBtn>
                        </MDBCol>
                    ) : (null)}
                    {updateMode ? 
                    (<input className="grey"
                        value={currentContent}
                        onChange={(ev) => setNewCurrentContent(ev.target.value)}
                    />
                    ) : (
                            <MDBCol className="text-left" md="10">{currentContent}</MDBCol>
                        )}
                    <MDBCol className="text-right" md="1">
                        <MDBIcon id="like" icon="thumbs-up" size="lg" onClick={sendLike} />
                        {likesNumber}
                    </MDBCol>
                    <MDBCol className="text-right" md="1">
                        <MDBIcon id="dislike" icon="thumbs-down" size="lg" onClick={sendDislike}
                        />
                        {dislikesNumber}
                    </MDBCol>
                    <MDBCol>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>


        </div>
    )

};


export default IndividualBookReviewsDisplay;