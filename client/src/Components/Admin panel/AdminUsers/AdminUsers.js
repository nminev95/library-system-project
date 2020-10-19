import React, { useEffect, useState } from 'react';
import { MDBBtn, MDBInput, MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import UserTableRow from './UserTableRow/UserTableRow';
import BanDeletePopUp from './BanDeletePopUp/BanDeletePopUp';

const AdminUsers = () => {

    const [tableContent, setTableContent] = useState([]);
    const [isHidden, setIsHidden] = useState(true)

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


    return (
        <MDBTable style={{ margin: "40px" }} btn responsiveMd>
            <TextareaPage/>
            <BanDeletePopUp/>
            <MDBTableHead columns={columns} />
            <MDBTableBody>
            {tableContent.map((record) => <UserTableRow content={record}/>)}
            </MDBTableBody>

        </MDBTable>
    )
}

export default AdminUsers;

const TextareaPage = () => {
    return (
        <MDBInput type="textarea" label="Material textarea" rows="5" />
    )
}