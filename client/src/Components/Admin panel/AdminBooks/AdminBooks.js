import React, { useEffect, useState } from 'react';
import { MDBContainer, MDBDataTableV5 } from 'mdbreact';
import './AdminBooks.css';

const AdminBooks = () => {

    const [records, setRecords] = useState([])
    const [rows, setRows] = useState([]);
    const [columns, setColumns] = useState([{
        label: '#',
        field: 'id',
        width: 180,
        sort: 'disabled'
    },
    {
        label: 'Title',
        field: 'Title',
        width: 180,
    },
    {
        label: 'Author',
        field: 'Author',
        width: 270,
    },
    {
        label: 'Genre',
        field: 'Genre',
        width: 200,
    },
    {
        label: 'Status',
        field: 'Status',
        sort: 'asc',
        width: 100,
    },]);

    useEffect(() => {
        fetch(`http://localhost:4000/books`)
            .then(res => res.json())
            .then(data => setRecords(data))
    }, []);

    records.map((record) => {
        record.button1 = <button></button>
        record.button2 = <button></button>
    })

        return (
            <MDBContainer style={{ margin: "30px" }}>
                <MDBDataTableV5
                    btn
                    hover
                    responsive
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