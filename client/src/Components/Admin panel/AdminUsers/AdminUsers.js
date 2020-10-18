import React, { useEffect, useState } from 'react';
import { MDBBtn, MDBDataTable, MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import UserTableRow from './UserTableRow/UserTableRow';

const AdminUsers = () => {

    const [tableContent, setTableContent] = useState([]);

    const columns = [
        {
            label: '#',
            field: 'id',
            sort: 'asc'
        },
        {
            label: 'Username',
            field: 'username',
            sort: 'asc'
        },
        {
            label: 'Email',
            field: 'email',
            sort: 'asc'
        },
        {
            label: 'Level',
            field: 'level',
            sort: 'asc'
        },
        {
            label: 'Registered',
            field: 'registered',
            sort: 'asc'
        },
    ];

    useEffect(() => {
        fetch(`http://localhost:4000/admin/users`)
            .then(res => res.json())
            .then(data => setTableContent(data))
    }, []);
    const res = tableContent.map((record) => <UserTableRow content={record}/>)
    return (
        <MDBDataTable style={{ margin: "40px" }} btn responsiveMd>
            <MDBTableHead />
            <MDBTableBody data={[columns, tableContent.map((record) => <UserTableRow content={record}/>)]}> 
            {/* {tableContent.map((record) => <UserTableRow content={record}/>)} */}
            </MDBTableBody>

        </MDBDataTable>
    )
}

export default AdminUsers;