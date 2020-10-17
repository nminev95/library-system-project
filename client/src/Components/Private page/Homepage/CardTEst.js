import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardImage, MDBView, MDBCardTitle, MDBCardText, MDBInput, MDBBtn, MDBIcon, MDBModalFooter } from 'mdbreact';
import aha from '../../../aha.png'
import './CardTest.css';

const Card = () => {
    return (
        
            <MDBContainer fluid className="booksCont">
                <MDBRow className="bookRow">
                    <MDBCol lg="2"  className="cardBook">
                        <MDBCard >
                            <MDBView cascade className="d-flex justify-content-center">
                                <MDBCardImage id="bookImageContainer"
                                    hover
                                    overlay='white-slight'
                                    className='card-img-top w-responsive text-center mx-auto p-3 mt-2 h-auto d-inline-block'
                                    src="https://i.pinimg.com/originals/be/73/56/be73560141d17a8ed517e81e83bb3f24.jpg"
                                    alt='food'
                                />
                            </MDBView>
                            <MDBCardBody>
                                <h5 className='pink-text'>
                                    <MDBIcon icon='utensils' /> Culinary
                            </h5>
                                <MDBCardTitle className='font-weight-bold'>
                                    Cheat day inspirations
                            </MDBCardTitle>
                                
                                <MDBBtn color='unique'>Button</MDBBtn>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol lg="2"  className="cardBook">
                        <MDBCard >
                            <MDBView cascade className="d-flex justify-content-center">
                                <MDBCardImage id="bookImageContainer"
                                    hover
                                    overlay='white-slight'
                                    className='card-img-top w-responsive text-center mx-auto p-3 mt-2 h-auto d-inline-block'
                                    src="https://media.harrypotterfanzone.com/deathly-hallows-us-childrens-edition.jpg"
                                    alt='food'
                                />
                            </MDBView>
                            <MDBCardBody>
                                <h5 className='pink-text'>
                                    <MDBIcon icon='utensils' /> Culinary
                            </h5>
                                <MDBCardTitle className='font-weight-bold'>
                                    Cheat day inspirations
                            </MDBCardTitle>
                                <MDBCardText>
                                    Sed ut perspiciatis unde omnis iste natus sit voluptatem
                                    accusantium doloremque laudantium, totam rem aperiam.
                            </MDBCardText>
                                <MDBBtn color='unique'>Button</MDBBtn>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol lg="2"  className="cardBook">
                        <MDBCard >
                            <MDBView cascade className="d-flex justify-content-center">
                                <MDBCardImage id="bookImageContainer"
                                    hover
                                    overlay='white-slight'
                                    className='card-img-top w-responsive text-center mx-auto p-3 mt-2 h-auto d-inline-block'
                                    src="https://i.pinimg.com/originals/be/73/56/be73560141d17a8ed517e81e83bb3f24.jpg"
                                    alt='food'
                                />
                            </MDBView>
                            <MDBCardBody>
                                <h5 className='pink-text'>
                                    <MDBIcon icon='utensils' /> Culinary
            </h5>
                                <MDBCardTitle className='font-weight-bold'>
                                    Cheat day inspirations
            </MDBCardTitle>
                                <MDBCardText>
                                    Sed ut perspiciatis unde omnis iste natus sit voluptatem
                                    accusantium doloremque laudantium, totam rem aperiam.
            </MDBCardText>
                                <MDBBtn color='unique'>Button</MDBBtn>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol lg="2" className="cardBook">
                        <MDBCard >
                            <MDBView cascade className="d-flex justify-content-center">
                                <MDBCardImage id="bookImageContainer"
                                    hover
                                    overlay='white-slight'
                                    className='card-img-top w-responsive text-center mx-auto p-3 mt-2 h-auto d-inline-block'
                                    src="https://i.pinimg.com/originals/be/73/56/be73560141d17a8ed517e81e83bb3f24.jpg"
                                    alt='food'
                                />
                            </MDBView>
                            <MDBCardBody>
                                <h5 className='pink-text'>
                                    <MDBIcon icon='utensils' /> Culinary
            </h5>
                                <MDBCardTitle className='font-weight-bold'>
                                    Cheat day inspirations
            </MDBCardTitle>
                                <MDBCardText>
                                    Sed ut perspiciatis unde omnis iste natus sit voluptatem
                                    accusantium doloremque laudantium, totam rem aperiam.
            </MDBCardText>
                                <MDBBtn color='unique'>Button</MDBBtn>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>

    )
}

export default Card;