import React from 'react';
import './Content.css';
import image from '../../cover2.jpg';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import LockIcon from '@material-ui/icons/Lock';
import { Link } from 'react-router-dom';

const Content = () => {
    return (

        <div className="imageDiv">
            <img src={image}></img>
            <div className="centered">
                <p className="centeredText">All your favourite books in one place.</p>
                <p className="centeredText2">Grab your pass to personal freedom.</p>
                <div className="buttonsGrid">
                    <Link to="/auth/signin">
                    <button className="signInButton"><LockIcon/>Sign In</button>
                    </Link>
                    <Link to="/users">
                    <button className="registerButton"><PersonAddIcon/>Register</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Content