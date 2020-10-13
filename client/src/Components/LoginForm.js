import React, { useState } from 'react';
import './LoginForm.css';

const LoginForm = (props) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className="loginForm">
            <h1>Sign In</h1>
            <div>
                <input type="text"
                    className="usernameField"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}>
                </input>
            </div>
            <div>
                <input type="password"
                    className="passwordField"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}>
                </input>
            </div>
            <button className="loginButton" onClick={() => console.log({ username, password })}>Sign In</button>
            <div>
                <p>Don't have an account?</p>
                <p><a href="localhost:3000/register">Sign up now.</a></p>
            </div>
        </div>
    )
}

export default LoginForm;