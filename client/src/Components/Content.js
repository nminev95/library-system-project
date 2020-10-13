import React from 'react';
import './Content.css';
import image from '../test2-min.png'
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import LockIcon from '@material-ui/icons/Lock';

const Content = () => {
    return (

        <div className="imageDiv">
            <img src={image}></img>
            <div className="centered">
                <p className="centeredText">All your favourite books in one place.</p>
                <p className="centeredText2">Grab your pass to personal freedom.</p>
                <div className="buttonsGrid">
                    <button className="signInButton"><LockIcon/>Sign In</button>
                    <button className="registerButton"><PersonAddIcon/>Register</button>
                </div>
            </div>
        </div>
    )
}

export default Content