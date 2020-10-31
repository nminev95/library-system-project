import React, { useState, Fragment } from 'react';
import TextField from '@material-ui/core/TextField';
import { MDBBtn, MDBMask, MDBCard, MDBContainer, MDBRow, MDBCol, MDBModalFooter, MDBView } from 'mdbreact';
import { Link, useHistory } from 'react-router-dom';
import swal from '@sweetalert/with-react'
import { makeStyles } from '@material-ui/core/styles';
import image from '../../../register.jpg'

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 400,
        },
    },
}));

const ValidationTextFields = () => {
    const classes = useStyles();
    const history = useHistory()

    const [form, setForm] = useState({
        username: {
            name: 'username',
            label: 'Username',
            type: 'text',
            validators: {
                required: true,
                minLen: 6,
                maxLen: 30,
            },
            valid: true,
            value: '',
        },
        email: {
            name: 'email',
            label: 'Email',
            type: 'email',
            validators: {
                required: true,
                regex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            },
            valid: true,
            value: '',
        },
        password: {
            name: 'password',
            label: 'Password',
            type: 'password',
            validators: {
                required: true,
                minLen: 8,
                maxLen: 40
            },
            valid: true,
            value: '',
        },
        passwordConfirm: {
            name: 'passwordConfirm',
            label: 'Confirm password',
            type: 'password',
            validators: {
                required: true,
                minLen: 8,
                maxLen: 40,
            },
            valid: true,
            value: '',
        },
    });

    const onInputChange = (ev) => {
        const { name, value } = ev.target;

        const copyControl = { ...form[name] };
        copyControl.value = value;
        copyControl.valid = true;

        if (copyControl.validators.required) {
            copyControl.valid = copyControl.valid && copyControl.value.length >= 1;
        }
        if (copyControl.validators.minLen) {
            copyControl.valid =
                copyControl.valid &&
                copyControl.value.length >= copyControl.validators.minLen;
        }
        if (copyControl.validators.maxLen) {
            copyControl.valid =
                copyControl.valid &&
                copyControl.value.length <= copyControl.validators.maxLen;
        }

        if (copyControl.validators.regex) {
            copyControl.valid =
                copyControl.valid &&
                copyControl.validators.regex.test(copyControl.value)
        }

        setForm({ ...form, [name]: copyControl });
    };

    const handleSubmit = (ev) => {
        ev.preventDefault();

        const userData = Object.values(form).reduce((data, input) => {
            return { ...data, [input.name]: input.value };
        }, {});
        console.log(userData)
        fetch('http://localhost:4000/users', {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
            .then(result => {
                if (result.message === 'Name not available') {
                    swal({
                        title: "Oops!",
                        text: "Looks like the username you have entered is already taken! Please try a different one.",
                        icon: "error",
                        button: "Okay"
                    })
                } else if (result.message === 'Passwords don\'t match') {
                    swal({
                        title: "Oops!",
                        text: "Looks like passwords don't match. Please try again.",
                        icon: "error",
                        button: "Okay"
                    })
                } else if (!result.message) {
                    swal({
                        title: "Success!",
                        text: "Account created successfully! Click on the button to procced to login page.",
                        icon: "success",
                        button: "Login"
                    }).then(function () {
                        history.push('/auth/signin')
                    });
                }
            })

    }


    const formView = Object.values(form).map((input) => {
        return (
            <Fragment key={input.name}>
                {input.valid ? (
                    <TextField
                        label={input.label}
                        name={input.name}
                        type={input.type}
                        value={input.value}
                        onChange={onInputChange}
                        variant="outlined"
                    />
                ) : (
                        (
                            input.name === 'email' ? (
                                <TextField
                                    label={input.label}
                                    name={input.name}
                                    type={input.type}
                                    value={input.value}
                                    onChange={onInputChange}
                                    variant="outlined"
                                    error
                                    helperText="Please enter a valid email address."
                                />
                            ) : (
                                    <TextField
                                        label={input.label}
                                        name={input.name}
                                        type={input.type}
                                        value={input.value}
                                        onChange={onInputChange}
                                        variant="outlined"
                                        error
                                        helperText={`${input.label} should be between ${input.validators.minLen} and ${input.validators.maxLen} characters.`}
                                    />
                                )
                        )
                    )}
                <br />
            </Fragment>
        );
    });

    return (
        <MDBView src={image}>
            <MDBMask overlay="stylish-light" className="flex-center flex-column text-white text-center">
      
               
                            <MDBCard style={{ background: "rgb(220,220,220,0.2)", padding:"60px" }}>
                                <div style={{ textAlign: "center" }}>
                                    <h3 style={{ marginBottom: "40px" }}>Create an account</h3>
                                    <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
                                        {formView}
                                        <div className="text-center">
                                            <MDBBtn type="submit" style={{ marginTop: "30px" }} id="main-button">Register</MDBBtn>
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
                                </div>
                            </MDBCard>
                  
        
            </MDBMask>
        </MDBView>
    );
}

export default ValidationTextFields;

// import React, { useState } from 'react';
// import './RegisterForm.css';
// import TextField from '@material-ui/core/TextField';
// import { Link } from 'react-router-dom';
// import 'mdbreact/dist/css/mdb.css'
// import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBIcon, MDBModalFooter } from 'mdbreact';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//     faGoogle,
//     faFacebook,
// } from '@fortawesome/free-brands-svg-icons';
// import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
// import ValidationTextFields from './register';

// const LoginForm = () => {  


//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const [email, setEmail] = useState('');

//     const handleSubmit = () => {
//         if (password !== confirmPassword) {
//             return alert('Passwords don\'t match!');
//         }
//     }

//     const sendUserData = async (userObject) => {
//         handleSubmit();
//         const settings = {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(userObject)
//         };
//         try {
//             const data = await fetch('http://localhost:4000/users', settings);
//             alert('You have registered successfully!');
//         } catch (e) {
//             return e;
//         }
//     }

//     return (

//         <MDBContainer className="registerContainer">
//             <ValidationTextFields/>
//             <MDBRow className="registerRow">
//                 <MDBCol className="registerCard" md="6">
//                     <MDBCard>
//                         <MDBCardBody className="mx-4">
//                             <form>
//                                 <p className="h5 text-center mb-4">Sign up</p>
//                                 <div className="grey-text">
//                                     <MDBInput label="Your name" icon="user" group type="text" validate error="wrong"
//                                         success="right"
//                                         value={username}
//                                         onChange={(event) => setUsername(event.target.value)}
//                                     />
//                                     <MDBInput label="Your email" icon="envelope" group type="email" validate error="wrong"
//                                         success="right"
//                                         value={email}
//                                         onChange={(event) => setEmail(event.target.value)}
//                                     />
//                                     <MDBInput label="Your password" icon="lock" group type="password" validate
//                                         error="wrong" success="right"
//                                         value={password}
//                                         onChange={(event) => setPassword(event.target.value)}
//                                     />
//                                     <MDBInput label="Confirm your password" icon="exclamation-triangle" group type="password" validate
//                                         value={confirmPassword}
//                                         onChange={(event) => setConfirmPassword(event.target.value)}
//                                     />
//                                 </div>
//                                 <div className="text-center">
//                                     <MDBBtn id="main-button" onClick={() => {
//                                         sendUserData({ username, password, email })
//                                     }}>Register</MDBBtn>
//                                 </div>
//                                 <div className="row my-3 d-flex justify-content-center">

//                                     <MDBModalFooter className="mx-5 pt-3 mb-1">
//                                         <p className="font-small grey-text d-flex justify-content-end">
//                                             Already have an account?
//                                     <Link to="/auth/signin">
//                                                 <a href="#!" className="blue-text ml-1">Sign In</a>
//                                             </Link>
//                                         </p>
//                                     </MDBModalFooter>
//                                 </div>
//                             </form>
//                         </MDBCardBody>

//                     </MDBCard>
//                 </MDBCol>
//             </MDBRow>
//         </MDBContainer>
//     );
// };

// export default LoginForm;