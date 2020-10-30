import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Content from './Content/Content';
import TextImageRow from './ContentRow/TextImageRow';
import books from '../../../Closed_Book_Icon.svg';
import returnBook from '../../../aha.png';
import './Homepage.css';
import home from '../../../home.jpg'
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink, MDBContainer, MDBMask, MDBView, MDBDropdown, MDBDropdownToggle, MDBIcon, MDBDropdownMenu, MDBDropdownItem } from 'mdbreact';
import { BrowserRouter as Router, Link } from 'react-router-dom';
const HomePage = () => {
  return (

    <div className="body">
      {/* <FullPageIntroWithFixedTransparentNavbar /> */}
      <Content />
      {/* <TextImageRow id="1" icon={books}>
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
      </TextImageRow> */}
    </div>

  );
}

export default HomePage;

// class FullPageIntroWithFixedTransparentNavbar extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       collapse: false,
//       isWideEnough: false,
//     };
//     this.onClick = this.onClick.bind(this);
//   }


//   onClick() {
//     this.setState({
//       collapse: !this.state.collapse,
//     });
//   }

//   render() {
//     return (
//       <div>
//         <header>

//           <MDBNavbar id="navbar" color="bg-primary" fixed="top" dark expand="md" scrolling transparent>
//             <MDBNavbarBrand href="/">
//               <strong>Navbar</strong>
//             </MDBNavbarBrand>
//             {!this.state.isWideEnough && <MDBNavbarToggler onClick={this.onClick} />}
//             <MDBCollapse isOpen={this.state.collapse} navbar>
//               <MDBNavbarNav right style={{ paddingRight: "15px" }}>
//                 <MDBNavItem>
//                   <MDBNavLink to="/auth/signin">Sign in</MDBNavLink>
//                 </MDBNavItem>
//                 <MDBNavItem>
//                   <MDBNavLink to="/users">Register</MDBNavLink>
//                 </MDBNavItem>
//                 <MDBNavItem>
//                   <MDBDropdown>
//                     <MDBDropdownToggle nav caret>
//                       <MDBIcon icon="user" className="mr-1" />Profile
//                 </MDBDropdownToggle>
//                     <MDBDropdownMenu className="dropdown-default" right>
//                       <MDBDropdownItem style={{padding: '10px'}} href="#!">My account</MDBDropdownItem>
//                       <MDBDropdownItem style={{padding: '10px'}} href="#!">Log out</MDBDropdownItem>
//                     </MDBDropdownMenu>
//                   </MDBDropdown>
//                 </MDBNavItem>
//               </MDBNavbarNav>
//             </MDBCollapse>
//           </MDBNavbar>


//           <MDBView src={home}>
//             <MDBMask overlay="stylish-light" className="flex-center flex-column text-white text-center">
//               <h2>This Navbar is fixed</h2>
//               <h5>It will always stay visible on the top, even when you scroll down</h5>
//               <p>Navbar's background will switch from transparent to solid color while scrolling down</p><br />
//               <p>Full page intro with background image will be always displayed in full screen mode, regardless of device </p>
//             </MDBMask>
//           </MDBView>
//         </header>

//         <main>
//           <MDBContainer className="text-center my-5">
//             <p align="justify">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
//           </MDBContainer>
//         </main>
//       </div>
//     );
//   }
// }

