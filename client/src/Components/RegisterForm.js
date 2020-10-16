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
    const [confirmPassword, setConfirmPasswod] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = () => {
        if (password !== confirmPassword) {
            alert('Passwords don\'t match!');
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
            <MDBRow>
                <MDBCol className="registerCard" md="6">
                    <form>
                        <p className="h5 text-center mb-4">Sign up</p>
                        <div className="grey-text">
                            <MDBInput label="Your name" icon="user" group type="text" validate error="wrong"
                                success="right"
                                onChange={(event) => setUsername(event.target.value)}
                            />
                            <MDBInput label="Your email" icon="envelope" group type="email" validate error="wrong"
                                success="right"
                                onChange={(event) => setUsername(event.target.value)}
                            />
                            <MDBInput label="Your password" icon="exclamation-triangle" group type="password" validate
                                error="wrong" success="right"
                                onChange={(event) => setUsername(event.target.value)}
                            />
                            <MDBInput label="Confirm your password" icon="lock" group type="password" validate />
                        </div>
                        <div className="text-center">
                            <MDBBtn color="primary" onClick={() => sendUserData()}>Register</MDBBtn>
                        </div>
                        <div className="row my-3 d-flex justify-content-center">
                            <MDBBtn
                                type="button"
                                color="white"
                                rounded
                                className="mr-md-3 z-depth-1a"
                            >
                                <FontAwesomeIcon icon={faFacebook} style={{ color: "#99ccff" }} size='2x' />
                            </MDBBtn>
                            <MDBBtn
                                type="button"
                                color="white"
                                rounded
                                className="mr-md-3 z-depth-1a"
                            >
                                <FontAwesomeIcon icon={faGoogle} style={{ color: "#99ccff" }} size='2x' />
                            </MDBBtn>
                            <MDBModalFooter className="mx-5 pt-3 mb-1">
                                <p className="font-small grey-text d-flex justify-content-end">
                                    Already have an account?
                                    <Link to="/users">
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



// const LoginForm = (props) => {

//     return (
//         <div className="registerForm">
//             <h1 id="registerTitle">Create an account.</h1>
//             <div>
//                 <input type="text"
//                     placeholder="Username"
//                     className="usernameField"
//                     value={username}
//                     onFocus={(event) => event.target.placeholder = ''}
//                     onChange={(event) => setUsername(event.target.value)}>
//                 </input>
//             </div>
//             <div>
//                 <input type="text"
//                     placeholder="Email address"
//                     className="emailField"
//                     value={email}
//                     onFocus={(event) => event.target.placeholder = ''}
//                     onChange={(event) => setEmail(event.target.value)}>
//                 </input>
//             </div>
//             <div>
//                 <input type="password"
//                     placeholder="Password"
//                     className="passwordField"
//                     value={confirmPassword}
//                     onFocus={(event) => event.target.placeholder = ''}
//                     onChange={(event) => setConfirmPasswod(event.target.value)}>
//                 </input>
//             </div>
//             <div>
//                 <input type="password"
//                     placeholder="Password"
//                     className="passwordField"
//                     value={password}
//                     onFocus={(event) => event.target.placeholder = ''}
//                     onChange={(event) => setPassword(event.target.value)}>
//                 </input>
//             </div>
//             <button className="registerUserButton" onClick={() => {
//                 handleSubmit();
//                 sendUserData({ username, password, email });
//             }}>Sign In</button>
//             <div>
//                 <p>Already have an account?</p>
//                 <Link to="/auth/signin">
//                     <a>Sign in now.</a>
//                 </Link>
//             </div>
//         </div>
//     )
// }

export default LoginForm;