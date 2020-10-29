import React, { useContext, useState } from 'react';
import './LoginForm.css';
import 'mdbreact/dist/css/mdb.css'
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBIcon, MDBModalFooter } from 'mdbreact';
import { Link, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { AuthContext } from '../../Private page/Context/AuthContext';
import { minLen, maxLen, required, regex }  from '../../../Validators.js';

import decode from 'jwt-decode';

const LoginForm = () => {
  const { setLoginState } = useContext(AuthContext);
  const history = useHistory();
  const [usernameControl, setUsernameControl] = useState({
    value: '',
    valid: false,
    validators: [required, minLen(5), maxLen(20)],
  });

  console.log(usernameControl.validators)
  const [passwordControl, setPasswordControl] = useState({
    value: '',
    valid: false,
    validators: [
      (value) => value.trim().length >= 1,
      (value) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,30}$/.test(value),
    ]
  });

  const validate = (value, validators) => {
    return validators.every((validator) => validator(value));
  }

  const onInputChange = (ev) => {
    const { value, name } = ev.target;

    if (name === "username") {
      const copyControl = { ...usernameControl }
      copyControl.value = value;
      copyControl.valid = validate(value, copyControl.validators)
      setUsernameControl(copyControl);
    } else if (name === 'password') {
      const copyControl = { ...passwordControl }
      copyControl.value = value;
      copyControl.valid = validate(value, passwordControl.validators)
      setPasswordControl(copyControl);
    }
  }

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
        const user = decode(json.token);
        setLoginState({ isLoggedIn: true, user: user });
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
                name="username"
                label="Your username"
                group
                icon="user"
                type="text"
                value={usernameControl.value}
                onChange={onInputChange}
              />
              {!usernameControl.valid && <div>Invalid username!</div>}
              <MDBInput
                name="password"
                label="Your password"
                group
                icon="lock"
                type="password"
                validate
                containerClass="mb-0"
                value={passwordControl.value}
                onChange={onInputChange}
              />
              {!passwordControl.valid ? <div>Invalid username!</div> : null}
              <p className="font-small blue-text d-flex justify-content-end pb-3">
                Forgot
                          <a href="#!" className="blue-text ml-1">

                  Password?
                          </a>
              </p>
              <div className="text-center mb-3">
                <MDBBtn id="main-button" onClick={() => sendUserData()} > Sign in </MDBBtn>
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
