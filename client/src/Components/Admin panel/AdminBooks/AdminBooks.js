import React, { useEffect, useState } from 'react';
import { MDBBtn, MDBIcon, MDBContainer, MDBDataTableV5, MDBTableBody, MDBSpinner } from 'mdbreact';
import './AdminBooks.css';
import Loader from '../../Utils/Loader/Loader';
import { Link } from 'react-router-dom';

const AdminBooks = () => {

    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(false);
    const [records, setRecords] = useState([]);
    const [currentBook, setCurrentBook] = useState('');

    const toggleEditMode = () => {
        setEditMode((editMode) => !editMode)
    }

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
            .then(data => {
                data.map((record) => {
                    record.Button1 = <Link to={{
                        pathname: "books/edit",
                        state: {
                            id: record.id,
                            title: record.Title,
                            author: record.Author,
                            description: record.Description,
                            genre: record.Genre,
                            status: record.Status
                        }
                    }}>
                        <MDBBtn color="default" rounded size="sm" onClick={() => {
                            toggleEditMode()
                            setCurrentBook(record.id)
                        }}>Edit</MDBBtn>
                    </Link>
                    record.Button2 = <MDBBtn color="default" rounded size="sm" onClick={() => {
                        deleteBook(record.id)
                    }}>Delete</MDBBtn>
                })
                return data;
            })
            .then(result => setRecords(result))
            .finally(setLoading(false));
    }, [records.length]);

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
                const filtered = records.filter((book) => +(book.id) !== +id);
                console.log(filtered)
                setRecords(filtered)
            })
    }


    return (
        <MDBContainer className="booksAdminContainer">
            <Link to="books/add">
                <MDBBtn color="default" rounded size="lg" style={{ float: "right" }}><MDBIcon icon="plus" />Add book</MDBBtn>
            </Link>
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
