import React, { useState } from 'react';
import {MDBInput} from 'mdbreact';

const CreateReview = ({ create }) => {

  const [text, setText] = useState('');

  const createReview = () => {
    if (text.trim().length === 0) {
      alert('You must enter text in the input!');
      return;
    }

    create({ content: text });
    setText('');
  };


  return (
    
    <MDBInput className="white-text"  type="textarea" label= "Leave your review here..." rows="2"
    value={text}
    onChange={(ev) => setText(ev.target.value)}
    onKeyPress={event => {
      if (event.key === 'Enter') {createReview()}
      }}
    />
  );
};

export default CreateReview;
