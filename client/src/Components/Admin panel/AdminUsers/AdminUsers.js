import React, { useEffect, useState } from 'react';
import { MDBBtn, MDBContainer, MDBDataTableV5 } from 'mdbreact';
import Loader from '../../Utils/Loader/Loader';
import './AdminUsers.css'
import { Link } from 'react-router-dom';
import swal from 'sweetalert';

const AdminUsers = () => {
    const [currentUser, setCurrentUser] = useState('');
    const [loading, setLoading] = useState(false);
    const [records, setRecords] = useState([]);
    const [confirmState, setConfirmState] = useState(false);
    const [allBanned, setAllBanned] = useState([]);
    const [columns, setColumns] = useState([
        {
            label: '#',
            field: 'id',
            sort: 'asc',
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
        setLoading(true);
        fetch(`http://localhost:4000/admin/bans`, {
            mode: 'cors',
            headers: {
                'Authorization': `Bearer  ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(data => setAllBanned(data))
    }, [allBanned.length])

    const bannedIds = [];
    allBanned.forEach((object) => bannedIds.push(object.user_Id))
    console.log(bannedIds)

    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:4000/admin/users`, {
            mode: 'cors',
            headers: {
                'Authorization': `Bearer  ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(data => {
                data.map((record) => {
                    if (bannedIds.includes(+record.id)) {
                        record.Button1 = <MDBBtn color="default" rounded size="sm" onClick={() => handleDeleteBan(record.id)}>Unban</MDBBtn>
                    } else {
                        record.Button1 = <Link to={{
                            pathname: "users/ban",
                            state: {
                                id: record.id
                            }
                        }}><MDBBtn color="default" rounded size="sm" onClick={() => {
                            setCurrentUser(record.id)
                        }}>Ban</MDBBtn></Link>
                    }
                    record.Button2 = <MDBBtn color="default" rounded size="sm" onClick={() => {
                        deleteUser(record.id)
                    }}>Delete</MDBBtn>

                })
                return data;
            })
            .then(result => setRecords(result))
            .finally(setLoading(false));
    }, [records.length, allBanned]);

    const handleDeleteBan = (id) => {
        const settings = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer  ${localStorage.getItem("token")}`,
            },
        };

        fetch(`http://localhost:4000/admin/users/${id}/banstatus`, settings)
            .then((response) => response.json())
            .then(() => {
                const index = allBanned.findIndex((record) => +record === +id);
                const updatedRecords = allBanned.slice();
                updatedRecords.splice(index, 1);

                setAllBanned(updatedRecords)
            })
    }

    const deleteUser = (id) => {

        const settings = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer  ${localStorage.getItem("token")}`,
            },
        };

        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    swal("Poof! Your imaginary file has been deleted!", {
                        icon: "success",
                    });
                    setConfirmState((prevState) => !prevState);
                }
            })

        if (confirmState) {
            fetch(`http://localhost:4000/admin/users/${id}`, settings)
                .then((response) => response.json())
                .then(() => {
                    const index = records.findIndex((record) => record.id === id);
                    const updatedRecords = records.slice();
                    updatedRecords.splice(index, 1);

                    setRecords(updatedRecords)
                })
        } else {
            return;
        }
    }

    const loader = () => {
        if (loading) {
            return <Loader />
        }
    }

    return (
        <MDBContainer className="usersAdminContainer">
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

export default AdminUsers;
