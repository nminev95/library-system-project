import React from "react";
import { MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from "mdbreact";

const DropdownPage = () => {
    return (
        <MDBDropdown ref={React.createRef()} className="dropdownProfile">
            <MDBDropdownToggle color="white">
                <i className="fas fa-user-circle fa-2x"></i>
            </MDBDropdownToggle>
            <MDBDropdownMenu right basic>
                <MDBDropdownItem>Profile</MDBDropdownItem>
                <MDBDropdownItem>History</MDBDropdownItem>
                <MDBDropdownItem>Settings</MDBDropdownItem>
                <MDBDropdownItem>Logout</MDBDropdownItem>
            </MDBDropdownMenu>
        </MDBDropdown>
    );
}

export default DropdownPage;