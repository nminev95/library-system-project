import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './Components/NavBar';
import LoginForm from './Components/LoginForm';
import Content from './Components/Content';
import TextImageRow from './Components/TextImageRow';
import './App.css';
import books from './Closed_Book_Icon.svg'
import returnBook from './aha.png'

function App() {
  return (
    <div className="body">
      <NavBar sticky="top" />
      <Content />
      <TextImageRow icon={books}>
        <h1>Huge variety.</h1>
        <p>Many famous and best selling books from all over the world.</p>
        <p>Choose from fictional, horror, biographical, novels, scientific, poetry and others.</p>
        <p>All of world's top renowned authors in one library.</p>
      </TextImageRow>
      <TextImageRow icon={returnBook}>
        <h1>Borrow and return anytime.</h1>
        <p>Unlimited borrow capacity. Any book, any time, for any period.</p>
        <p>Over 10000 books available and waiting to be borrowed.</p>
        <p>Game system - gain points for every book read and returned and earn rewards.</p>
      </TextImageRow>
    </div>

  );
}

export default App;

//<LoginForm />