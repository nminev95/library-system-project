import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Homepage.css';
import home from '../../../home.jpg'
import {  MDBMask, MDBView, MDBBtn, MDBCol, MDBRow, MDBContainer } from 'mdbreact';
import { BrowserRouter as  Link } from 'react-router-dom';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import LockIcon from '@material-ui/icons/Lock';
import { withRouter} from 'react-router-dom';
import { Container } from '@material-ui/core';

const HomePage = (props) => {
  return (

    <div className="body">
      <FullPageIntroWithFixedTransparentNavbar props={props}/>
    </div>

  );
}

export default HomePage;

class FullPageIntroWithFixedTransparentNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      isWideEnough: false,
    };
    console.log('tuk', props)
    this.onClick = this.onClick.bind(this);
  }


  onClick() {
    this.setState({
      collapse: !this.state.collapse,
    });
  }

  render() {
    return (
      <div>
        <header>
          <MDBView src={home}>
            <MDBMask overlay="stylish-light" className="flex-center flex-column text-white text-center">
              <div className="container my-5 z-depth-1" className="centered" style={{display: 'flex',flexDirection: 'column', justifyContent: 'space-between'}}>
                <div style={{marginTop: '40px'}}>
                <h1 className="centeredText">All your favourite books in one place.</h1>
                <h3 className="centeredText2">Grab your pass to personal freedom.</h3>
                </div>
                <div className="buttonsGrid">
                   
                    <MDBBtn className="signInButton" color="white" onClick={()=> {this.props.props.history.push(`/auth/signin`)}}><LockIcon/>Sign In</MDBBtn>
                    <MDBBtn className="registerButton " color="white" onClick={()=> {this.props.props.history.push(`/users`)}}><PersonAddIcon/>Register</MDBBtn>
                    
                </div>
                <fib></fib>
              </div>
            </MDBMask>
          </MDBView>
        </header>
      </div>
    );
  }
}

