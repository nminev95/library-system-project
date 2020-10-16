import React, { useState } from 'react';
import './LoginForm.css';
import 'mdbreact/dist/css/mdb.css'
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBIcon, MDBModalFooter } from 'mdbreact';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGoogle,
  faFacebook,
} from '@fortawesome/free-brands-svg-icons';
const LoginForm = () => {
  return (
    <MDBContainer className="loginContainer">
      <MDBRow>
        <MDBCol md="6">
          <MDBCard>
            <MDBCardBody className="mx-4">
              <div className="text-center">
                <h3 className="dark-grey-text mb-5">
                  <strong>Sign in</strong>
                </h3>
              </div>
              <MDBInput
                label="Your email"
                group
                type="email"
                validate
                error="wrong"
                success="right"
              />
              <MDBInput
                label="Your password"
                group
                type="password"
                validate
                containerClass="mb-0"
              />
              <p className="font-small blue-text d-flex justify-content-end pb-3">
                Forgot
                          <a href="#!" className="blue-text ml-1">

                  Password?
                          </a>
              </p>
              <div className="text-center mb-3">
                <MDBBtn
                  type="button"
                  gradient="blue"
                  rounded
                  className="btn-block z-depth-1a"
                >
                  Sign in
                          </MDBBtn>
              </div>
              <p className="font-small dark-grey-text text-right d-flex justify-content-center mb-3 pt-2">

                or Sign in with:
                        </p>
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
              </div>
            </MDBCardBody>
            <MDBModalFooter className="mx-5 pt-3 mb-1">
              <p className="font-small grey-text d-flex justify-content-end">
                Not a member?
                <Link to="/users">
                  <a href="#!" className="blue-text ml-1">Sign Up</a>
                </Link>
              </p>
            </MDBModalFooter>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default LoginForm;
// const LoginForm = (props) => {

//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');

//     return (
//         <div className="loginForm">
//             <h1 id="loginTitle">Sign In</h1>
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
//                 <input type="password"
//                     placeholder="Password"
//                     className="passwordField"
//                     value={password}
//                     onFocus={(event) => event.target.placeholder = ''}
//                     onChange={(event) => setPassword(event.target.value)}>
//                 </input>
//             </div>
//             <button className="loginButton" onClick={() => console.log({ username, password })}>Sign In</button>
//             <div>
//                 <p>Don't have an account?</p>
//                 <Link to="/users">
//                 <a>Sign up now.</a>
//                 </Link>
//             </div>
//         </div>
//     )
// }

// export default LoginForm;