import React, { useEffect, useState } from 'react';
import { MDBBtn, MDBContainer, MDBDataTableV5 } from 'mdbreact';
import Loader from '../../Utils/Loader/Loader';
import './AdminReviews.css';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';

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
        fetch(`http://localhost:4000/admin/reviews`, {
            mode: 'cors',
            headers: {
                'Authorization': `Bearer  ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(data => {
                data.map((record) => {
                    record.Button1 =
                    <Link to={{
                        pathname: "reviews/edit",
                        state: {
                            id: record.id,
                            content: record.Review,
                            bookId: record.Book
                        }
                    
                    }}>
                     <MDBBtn color="default" rounded size="sm">Edit</MDBBtn>
                    </Link >
                    record.Button2 = <MDBBtn color="default" rounded size="sm" onClick={() => {
                        deleteReview(+(record.Book), +(record.id))
                    }}>Delete</MDBBtn>
                })
                return data;
            })
            .then((data) => setRecords(data))
            .finally(() => setLoading(false))
    }, [records.length]);

    const deleteReview = (bookId, id) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, this review will be forever lost!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    removeReview(bookId, id)
                    swal({
                        title: "Success!",
                        text:"Review was successfully removed from database.", 
                        icon: "success",
                        buttons:false,
                        timer: 1500,
                    });
                }
            })
    }

    const removeReview = (bookId, id) => {
        const settings = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer  ${localStorage.getItem("token")}`,
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
