import React, { useState } from 'react';
import './TextImageRow.css';

const TextImageRow = (props) => {
    if (props.id % 2 === 1) {
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
    } else {
        return (
            <div className="textImageBlock">
                <div className="textBlock">
                    {props.children}
                </div>
                <div className="imageBlock">
                    <img src={props.icon}></img>
                </div>
            </div>
        )
    }
}

export default TextImageRow;