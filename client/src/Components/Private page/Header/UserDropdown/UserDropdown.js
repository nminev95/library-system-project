import React from "react";
import { MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from "mdbreact";

const DropdownPage = () => {
    return (
        <MDBDropdown className="block-example border border-0">
            <MDBDropdownToggle className="block-example border border-0" color="white">
                <i className="fas fa-user-circle fa-2x"></i>
            </MDBDropdownToggle>
            <MDBDropdownMenu right basic>
                <MDBDropdownItem>Profile</MDBDropdownItem>
                <MDBDropdownItem>Borrowed books</MDBDropdownItem>
                <MDBDropdownItem>Settings</MDBDropdownItem>
                <MDBDropdownItem>Logout</MDBDropdownItem>
            </MDBDropdownMenu>
        </MDBDropdown>
    );
}

export default DropdownPage;