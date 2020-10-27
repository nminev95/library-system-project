import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { MDBBtn, MDBIcon, MDBInput } from 'mdbreact';

const ProfilePage = () => {
    const { user } = useContext(AuthContext);

    const [editMode, setEditMode] = useState(false);
    const [email, setEmail] = useState('');
    const [userData, setUserData] = useState('');
    const [username, setUsername] = useState('');
    
    const toggleEditMode = () => {
        setEditMode((editMode) => !editMode)
    }

    useEffect(() => {
        fetch(`http://localhost:4000/users/${user.sub}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json',
            }
        })
            .then(data => data.json())
            .then(info => {
                setUserData(info[0])
                setUsername(info[0].Username)
                setEmail(info[0].Email)
            })
    }, [])
    
    console.log(userData)
    const updateUserData = (username, email) => {
        fetch(`http://localhost:4000/users/${user.sub}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                email: email
            }),
        })
            .then(r => r.json())
            .then(result => {
                if (result.error) {
                    throw new Error(result.error);
                }
            })
            .then(() => {
                setUsername(username)
                setEmail(email)
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
                            <p ><MDBIcon icon="user-circle" /> Your username: {username}</p>
                            <br></br>
                            <p> <MDBIcon icon="envelope" /> Your email address: {email}</p>
                            <br></br>
                        </>
                    )
                }
                <p> <MDBIcon icon="user-plus" /> Join date: {userData.Joined}</p>
                <br></br>
                <p> <MDBIcon icon="trophy" /> Current level: {userData.Level} </p>
                <br></br>
                <p> <MDBIcon icon="gamepad" /> Current read points: {userData.Points} </p>
                <br></br>
                {editMode ? (
                    <>
                        <MDBBtn onClick={() => {
                            updateUserData(username, email)
                            toggleEditMode()
                        }}>Save changes</MDBBtn> <MDBBtn>Change password</MDBBtn>
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