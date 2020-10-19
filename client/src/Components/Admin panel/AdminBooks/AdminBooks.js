import React, { useEffect, useState } from 'react';
import { MDBBtn, MDBContainer, MDBDataTableV5, MDBTableBody } from 'mdbreact';
import './AdminBooks.css';

const AdminBooks = () => {

    const [records, setRecords] = useState([])
    const [columns, setColumns] = useState([{
        label: '#',
        field: 'id',
        width: 280,
        sort: 'disabled'
    },
    {
        label: 'Title',
        field: 'Title',
        width: 300,
    },
    {
        label: 'Author',
        field: 'Author',
        width: 300,
    },
    {
        label: 'Genre',
        field: 'Genre',
        width: 240,
    },
    {
        label: 'Status',
        field: 'Status',
        sort: 'asc',
        width: 180,
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
        fetch(`http://localhost:4000/books`)
            .then(res => res.json())
            .then(data => setRecords(data))
    }, []);

    records.map((record) => {
        record.Button1 = <td><MDBBtn color="default" rounded size="sm">Edit</MDBBtn></td>
        record.Button2 = <td><MDBBtn color="default" rounded size="sm">Delete</MDBBtn></td>
    })

    return (
        <MDBContainer className="booksAdminContainer">
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

export default AdminBooks;
