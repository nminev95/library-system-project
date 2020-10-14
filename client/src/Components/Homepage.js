import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Content from './Content';
import TextImageRow from './TextImageRow';
import books from '../Closed_Book_Icon.svg';
import returnBook from '../aha.png';
import './Homepage.css';

const HomePage = () => {
  return (
    

    <div className="body">
      <Content />
      <TextImageRow id="1" icon={books}>
        <h1>Huge variety.</h1>
        <p>Many famous and best selling books from all over the world.</p>
        <p>Choose from fictional, horror, biographical, novels, scientific, poetry and others.</p>
        <p>All of world's top renowned authors in one library.</p>
      </TextImageRow>
      <TextImageRow id="2" icon={returnBook}>
        <h1>Borrow and return anytime.</h1>
        <p>Unlimited borrow capacity. Any book, any time, for any period.</p>
        <p>Over 10000 books available and waiting to be borrowed.</p>
        <p>Game system - gain points for every book read and returned and earn rewards.</p>
      </TextImageRow>
      <TextImageRow id="3" icon={returnBook}>
        <h1>Borrow and return anytime.</h1>
        <p>Unlimited borrow capacity. Any book, any time, for any period.</p>
        <p>Over 10000 books available and waiting to be borrowed.</p>
        <p>Game system - gain points for every book read and returned and earn rewards.</p>
      </TextImageRow>
    </div>

  );
}

export default HomePage;
