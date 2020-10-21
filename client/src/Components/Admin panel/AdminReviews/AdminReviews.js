import React, { useEffect, useState } from 'react';
import { MDBBtn, MDBContainer, MDBDataTableV5 } from 'mdbreact';
import Loader from '../../Utils/Loader/Loader';
import './AdminReviews.css'

const AdminReviews = () => {
    const [bookId, setBookId] = useState('');
    const [loading, setLoading] = useState(false)
    const [records, setRecords] = useState([])
    const [columns, setColumns] = useState([
        {
            label: '#',
            field: 'id',
            sort: 'asc'
        },
        {
            label: 'Review',
            field: 'Review',
            sort: 'asc'
        },
        {
            label: 'User',
            field: 'Author',
            sort: 'asc'
        },
        {
            label: 'Likes',
            field: 'Likes',
            sort: 'asc'
        },
        {
            label: 'Dislikes',
            field: 'Dislikes',
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
        setLoading(true);
        fetch(`http://localhost:4000/admin/reviews`)
            .then(res => res.json())
            .then(data => setRecords(data))
            .finally(() => setLoading(false))
    }, []);

    const deleteReview = (bookId, id) => {
        const settings = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        };
        fetch(`http://localhost:4000/admin/books/${bookId}/reviews/${id}`, settings)
            .then((response) => response.json())
            .then(() => {
                const index = records.findIndex((review) => review.id === id);
                const updatedRecords = records.slice();
                updatedRecords.splice(index, 1);

                setRecords(updatedRecords)
            })
    }

    const loader = () => {
        if (loading) {
            return <Loader />
        }
    }

    records.map((record) => {
        record.Button1 = <MDBBtn color="default" rounded size="sm">Edit</MDBBtn>
        record.Button2 = <MDBBtn color="default" rounded size="sm" onClick={() => {

            deleteReview(+(record.Book), +(record.id))
        }}>Delete</MDBBtn>
    })
    
    return (
        <MDBContainer className="reviewAdminContainer">
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

export default AdminReviews;
