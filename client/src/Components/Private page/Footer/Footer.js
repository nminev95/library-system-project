import React, { useContext } from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import { useLocation } from 'react-router-dom';
import './Footer.css';
import AuthContext from "../Context/AuthContext";

const Footer = () => {
  const path = useLocation().pathname;
  const { user } = useContext(AuthContext);
  return (
    <>
      {path.includes('admin') || !user ?
        (<MDBFooter style={{display:"none"}}/>) 
        : (
        <MDBFooter id="footerDiv" color="grey darken-3" className="font-small lighten-3 pt-4 ">
          <MDBContainer className="text-center text-md-left">
            <MDBRow className="my-4">
              <MDBCol md="4" lg="4">
                <h5 className="text-uppercase mb-4 font-weight-bold">
                  Library system
            </h5>
                <p>
                  .
            </p>
              </MDBCol>
              <hr className="clearfix w-100 d-md-none" />
              <MDBCol md="2" lg="2" className="ml-auto">
                <h5 className="text-uppercase mb-4 font-weight-bold">About</h5>
                <ul className="list-unstyled">
                  <p>
                    <a href="#!">Home</a>
                  </p>
                  <p>
                    <a href="#!">Browse books</a>
                  </p>
                </ul>
              </MDBCol>
              <hr className="clearfix w-100 d-md-none" />
              <MDBCol md="5" lg="3">
                <h5 className="text-uppercase mb-4 font-weight-bold">Address</h5>
                <p>
                  <i className="fa fa-home mr-3" /> Sofia, Bulgaria
            </p>
                <p>
                  <i className="fa fa-envelope mr-3" /> info@example.com
            </p>
              </MDBCol>
              <hr className="clearfix w-100 d-md-none" />
              <MDBCol md="2" lg="2" className="text-center">
                <h5 className="text-uppercase mb-4 font-weight-bold">
                  Follow us
            </h5>
                <div className="mt-2 ">
                  <a type="button" className="btn-floating btn-small btn-fb" style={{ marginRight: "20px" }}>
                    <i className="fab fa-facebook fa-3x" />
                  </a>
                  <a type="button" className="btn-floating btn-small btn-tw">
                    <i className="fab fa-instagram fa-3x" />
                  </a>
                </div>
              </MDBCol>
              <hr className="clearfix w-100 d-md-none" />
            </MDBRow>
          </MDBContainer>
          <div className="footer-copyright text-center py-3">
            <MDBContainer fluid>
              &copy; {new Date().getFullYear()} Copyright: Team 5
        </MDBContainer>
          </div>
        </MDBFooter>
        )}
    </>
  );
}
export default Footer;