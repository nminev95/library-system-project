import React, { useState } from 'react';
import './LoginForm.css';
import { Link } from 'react-router-dom';

const LoginForm = (props) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className="loginForm">
            <h1 id="loginTitle">Sign In</h1>
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
                <input type="password"
                    placeholder="Password"
                    className="passwordField"
                    value={password}
                    onFocus={(event) => event.target.placeholder = ''}
                    onChange={(event) => setPassword(event.target.value)}>
                </input>
            </div>
            <button className="loginButton" onClick={() => console.log({ username, password })}>Sign In</button>
            <div>
                <p>Don't have an account?</p>
                <Link to="/users">
                <a>Sign up now.</a>
                </Link>
            </div>
        </div>
    )
}

export default LoginForm;