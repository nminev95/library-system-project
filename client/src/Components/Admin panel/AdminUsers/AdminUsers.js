import React, { useEffect, useState } from 'react';
import { MDBBtn, MDBContainer, MDBDataTableV5 } from 'mdbreact';
import BanDeletePopUp from './BanDeletePopUp/BanDeletePopUp';
import './AdminUsers.css'

const AdminUsers = () => {

    const [records, setRecords] = useState([])
    const [columns, setColumns] = useState([
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
        {
            label: 'Button1',
            field: 'Button1',
            width: 150,
            attributes: {
                'className': 'button1hide',
            },
        },
        {
            label: 'Button2',
            field: 'Button2',
            width: 150,
            attributes: {
                'className': 'button2hide',
            },
        }
    ]);

    useEffect(() => {
        fetch(`http://localhost:4000/admin/users`)
            .then(res => res.json())
            .then(data => setRecords(data))
    }, []);

    records.map((record) => {
        record.Button1 = <td><MDBBtn color="default" rounded size="sm">Ban</MDBBtn></td>
        record.Button2 = <td><MDBBtn color="default" rounded size="sm">Delete</MDBBtn></td>
    })

    return (
        <MDBContainer className="usersAdminContainer">
            <MDBDataTableV5
                btn
                hover
                responsiveXl
                entries={20}
                data={{ columns: columns, rows: records }}
                pagingTop
                searchTop
                searchBottom={false}
            />
        </MDBContainer>
    );
}

export default AdminUsers;
