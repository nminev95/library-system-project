import React, { useContext, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { MDBBtn, MDBIcon, MDBInput } from 'mdbreact';

const ProfilePage = () => {
    const { user } = useContext(AuthContext);

    const [editMode, setEditMode] = useState(false);
    const [username, setUsername] = useState(user.username);
    const [email, setEmail] = useState(user.email);

    const toggleEditMode = () => {
        setEditMode((editMode) => !editMode)
    }

    const updateUserDate = () => {
        fetch(`http://localhost:4000/user/${user.sub}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              
            }),
        })
            .then(r => r.json())
            .then(result => {
                if (result.error) {
                    throw new Error(result.error);
                }
            })
    }

    return (
        <div className="profileInfoContainer">
            <h1 style={{ margin: "40px" }}>Your profile</h1>
            <div style={{ margin: "70px" }}>
                <h3>User details</h3>
                <br></br>
                {editMode ? (
                    <>
                        <p ><MDBIcon icon="user-circle" /> Enter your new username:</p><MDBInput label="Your new username" value={username} onChange={(ev) => setUsername(ev.target.value)} />
                        <br></br>
                        <p> <MDBIcon icon="envelope" /> Enter your new email address:</p><MDBInput label="Your new email" value={email} onChange={(ev) => setEmail(ev.target.value)} />
                        <br></br>
                    </>
                ) : (
                        <>
                            <p ><MDBIcon icon="user-circle" /> Your username: {user.username}</p>
                            <br></br>
                            <p> <MDBIcon icon="envelope" /> Your email address: {user.email}</p>
                            <br></br>
                        </>
                    )
                }
                <p> <MDBIcon icon="user-plus" /> Join date: {user.registered.split('T')[0]}</p>
                <br></br>
                <p> <MDBIcon icon="trophy" /> Current level: {user.level.level} </p>
                <br></br>
                <p> <MDBIcon icon="gamepad" /> Current read points: {user.level.points} </p>
                <br></br>
                {editMode ? (
                    <>
                        <MDBBtn onClick={toggleEditMode}>Save changes</MDBBtn> <MDBBtn>Change password</MDBBtn>
                    </>
                ) : (
                        <>
                            <MDBBtn onClick={toggleEditMode}>Edit info</MDBBtn> <MDBBtn>Change password</MDBBtn>
                        </>
                    )
                }
            </div>
        </div >
    )
}

export default ProfilePage;