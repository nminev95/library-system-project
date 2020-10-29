import React, { useContext, useState } from 'react';
import './LoginForm.css';
import 'mdbreact/dist/css/mdb.css'
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBIcon, MDBModalFooter } from 'mdbreact';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Private page/Context/AuthContext';
import { minLen, maxLen, required, regex } from '../../../Validators.js';
import decode from 'jwt-decode';
import style from '../../../../node_modules/sweetalert-react/node_modules/sweetalert/dist/sweetalert.css'
import swal from '@sweetalert/with-react'

const LoginForm = () => {
  const { setLoginState } = useContext(AuthContext);
  const [invalidData, setInvalidData] = useState(null)
  const [showModal, setShowModal] = useState(false);

  const [usernameControl, setUsernameControl] = useState({
    value: '',
    valid: false,
    validators: [required, minLen(5), maxLen(20)],
  });
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
        const _ = setInvalidData(json.message)     
      } else {
        const modal = await swal({
          title: "Success!",
          text: "You have logged in successfully!",
          icon: "success",
          buttons: false,
          timer: 1500,
        })
        localStorage.setItem("token", json.token);
        const user = decode(json.token);
        setLoginState({ isLoggedIn: true, user: user });
      }
    } catch (e) {
      console.log(e.message)
    }
  }

  console.log(invalidData)
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
              <div className="grey-text">
                {invalidData ? (
                  <>
                    <MDBInput
                      style={{ borderBottom: "1px solid #FF0000" }}
                      name="username"
                      label="Your username"
                      group
                      icon="user"
                      type="text"
                      value={usernameControl.value}
                      onChange={onInputChange}
                      onFocus={() => setInvalidData(false)}
                    />
                    <MDBInput
                      style={{ borderBottom: "1px solid #FF0000" }}
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
                    <p style={{ color: "#FF0000", textAlign: "center" }}>Invalid username/password.</p>
                  </>
                ) : (
                    <>
                      <MDBInput
                        name="username"
                        label="Your username"
                        group
                        icon="user"
                        type="text"
                        value={usernameControl.value}
                        onChange={onInputChange}
                      />
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
                    </>
                  )
                }
              </div>
              <div className="text-center mb-3">
                <MDBBtn id="main-button" onClick={() => sendUserData({ username: usernameControl.value, password: passwordControl.value })} > Sign in </MDBBtn>
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
    </MDBContainer >
  );
};

export default LoginForm;
