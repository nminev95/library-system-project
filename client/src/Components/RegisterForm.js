import React, { useState } from 'react';
import './RegisterForm.css';
import { Link } from 'react-router-dom';

const LoginForm = (props) => {

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
        <div className="registerForm">
            <h1 id="registerTitle">Create an account.</h1>
            <div>
                <input type="text"
                    placeholder="Username"
                    className="usernameField"
                    value={username}
                    onFocus={(event) => event.target.placeholder = ''}
                    onChange={(event) => setUsername(event.target.value)}>
                </input>
            </div>
            <div>
                <input type="text"
                    placeholder="Email address"
                    className="emailField"
                    value={email}
                    onFocus={(event) => event.target.placeholder = ''}
                    onChange={(event) => setEmail(event.target.value)}>
                </input>
            </div>
            <div>
                <input type="password"
                    placeholder="Password"
                    className="passwordField"
                    value={confirmPassword}
                    onFocus={(event) => event.target.placeholder = ''}
                    onChange={(event) => setConfirmPasswod(event.target.value)}>
                </input>
            </div>
            <div>
                <input type="password"
                    placeholder="Password"
                    className="passwordField"
                    value={password}
                    onFocus={(event) => event.target.placeholder = ''}
                    onChange={(event) => setPassword(event.target.value)}>
                </input>
            </div>
            <button className="registerUserButton" onClick={() => {
                handleSubmit();
                sendUserData({ username, password, email });
            }}>Sign In</button>
            <div>
                <p>Already have an account?</p>
                <Link to="/auth/signin">
                    <a>Sign in now.</a>
                </Link>
            </div>
        </div>
    )
}

export default LoginForm;