import React, { useState } from 'react';
import './RegisterForm.css';
import { Link } from 'react-router-dom';
import 'mdbreact/dist/css/mdb.css'
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBIcon, MDBModalFooter } from 'mdbreact';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faGoogle,
    faFacebook,
} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';

const LoginForm = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = () => {
        if (password !== confirmPassword) {
        return alert('Passwords don\'t match!');
        }
    }

    const sendUserData = async (userObject) => {
        handleSubmit();
        const settings = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userObject)
        };
        try {
            const data = await fetch('http://localhost:4000/users', settings);
            alert('You have registered successfully!');
        } catch (e) {
            return e;
        }
    }

    return (
        <MDBContainer className="registerContainer">
            <MDBRow className="registerRow">
                <MDBCol className="registerCard" md="6">
                    <form>
                        <p className="h5 text-center mb-4">Sign up</p>
                        <div className="grey-text">
                            <MDBInput label="Your name" icon="user" group type="text" validate error="wrong"
                                success="right"
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                            />
                            <MDBInput label="Your email" icon="envelope" group type="email" validate error="wrong"
                                success="right"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                            <MDBInput label="Your password" icon="lock" group type="password" validate
                                error="wrong" success="right"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                            />
                            <MDBInput label="Confirm your password" icon="exclamation-triangle" group type="password" validate 
                                value={confirmPassword}
                                onChange={(event) => setConfirmPassword(event.target.value)}
                            />
                        </div>
                        <div className="text-center">
                            <MDBBtn id="main-button" onClick={() => {
                                sendUserData({username, password, email})
                                }}>Register</MDBBtn>
                        </div>
                        <div className="row my-3 d-flex justify-content-center">
                           
                            <MDBModalFooter className="mx-5 pt-3 mb-1">
                                <p className="font-small grey-text d-flex justify-content-end">
                                    Already have an account?
                                    <Link to="/auth/signin">
                                        <a href="#!" className="blue-text ml-1">Sign In</a>
                                    </Link>
                                </p>
                            </MDBModalFooter>
                        </div>
                    </form>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
};

export default LoginForm;