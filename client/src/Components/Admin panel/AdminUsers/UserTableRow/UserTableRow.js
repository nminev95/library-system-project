import React from 'react';
import { MDBBtn } from 'mdbreact';

const userTableRow = ({content}) => {
    console.log(content)
    return (
        <tr key={content.id}>
            <td>{content.id}</td>
            <td>{content.username}</td>
            <td>{content.email}</td>
            <td>{content.level}</td>
            <td>{content.registered}</td>
            <td><MDBBtn color="default" rounded size="sm">Ban</MDBBtn></td>
            <td><MDBBtn color="default" rounded size="sm">Delete</MDBBtn></td>
        </tr>

    )
}

export default userTableRow;