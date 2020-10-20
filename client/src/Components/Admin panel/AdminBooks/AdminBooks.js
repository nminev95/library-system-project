import React, { useEffect, useState } from 'react';
import { MDBBtn, MDBContainer, MDBDataTableV5, MDBTableBody, MDBSpinner } from 'mdbreact';
import './AdminBooks.css';
import Loader from '../../Utils/Loader/Loader';

const AdminBooks = () => {

    const [loading, setLoading] = useState(false)
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

    const loader = () => {
        if (loading) {
            return <Loader />
        }
    }
    useEffect(() => {
        setLoading(true)
        fetch(`http://localhost:4000/books`)
            .then(res => res.json())
            .then(data => setRecords(data))
            .finally(() => setLoading(false))
    }, []);

    const deleteBook = (id) => {
        const settings = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        };
        fetch(`http://localhost:4000/admin/books/${id}`, settings)
        .then((response) => response.json())
        .then(() => {
            const index = records.findIndex((book) => book.id === id);
            const updatedRecords = records.slice();
            updatedRecords.splice(index, 1);

            setRecords(updatedRecords)        
        })
    } 


    records.map((record) => {
        record.Button1 = <MDBBtn color="default" rounded size="sm">Edit</MDBBtn>
        record.Button2 = <MDBBtn color="default" rounded size="sm" onClick={() => {
            deleteBook(record.id)
        }}>Delete</MDBBtn>
    })

    return (
        <MDBContainer className="booksAdminContainer">
            {loader()}
            <MDBDataTableV5
                btn
                hover
                responsiveXl
                entries={10}
                data={{ columns: columns, rows: records }}
                pagingTop
                searchTop
                searchBottom={false}
            />
        </MDBContainer>
    );
}

export default AdminBooks;
