import React, { useState } from 'react';
import './TextImageRow.css';

const TextImageRow = (props) => {
    return (
        <div className="textImageBlock">
            <div className="imageBlock">
                <img src={props.icon}></img>
            </div>
            <div className="textBlock">
                {props.children}
            </div>
        </div>
    )
}

export default TextImageRow;