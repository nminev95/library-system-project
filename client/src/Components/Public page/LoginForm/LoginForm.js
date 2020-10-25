import React, { useContext, useState } from 'react';
import './LoginForm.css';
import 'mdbreact/dist/css/mdb.css'
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBIcon, MDBModalFooter } from 'mdbreact';
import { Link, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { AuthContext } from '../../Private page/Context/AuthContext';

const LoginForm = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setLoginState } = useContext(AuthContext);
  const history = useHistory();

  const sendUserData = async (userObject) => {
  
    const settings = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userObject)
    };
    try {
      const data = await fetch('http://localhost:4000/auth/signin', settings);
      const json = await data.json()
      if (json.message) {
        alert(json.message)
      } else {
        localStorage.setItem("token", json.token);
        setLoginState(true);
        history.push('/books')
      }
    } catch (e) {
      console.log(e.message)
    }
  }


  return (
    <MDBContainer className="loginContainer">
      <MDBRow className='loginRow'>
        <MDBCol md="6">
          <MDBCard>
            <MDBCardBody className="mx-4">
              <div className="text-center">
                <h3 className="dark-grey-text mb-5">
                  <strong>Sign in</strong>
                </h3>
              </div>
              <MDBInput
                label="Your username"
                group
                icon="user"
                type="text"
                validate
                error="wrong"
                success="right"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
              <MDBInput
                label="Your password"
                group
                icon="lock"
                type="password"
                validate
                containerClass="mb-0"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <p className="font-small blue-text d-flex justify-content-end pb-3">
                Forgot
                          <a href="#!" className="blue-text ml-1">

                  Password?
                          </a>
              </p>
              <div className="text-center mb-3">
                <MDBBtn id="main-button" onClick={() => sendUserData({ username, password })} > Sign in </MDBBtn>
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
