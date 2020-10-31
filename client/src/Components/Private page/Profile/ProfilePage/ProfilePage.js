import React, { useContext, useEffect, useState, Component } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { MDBBtn, MDBIcon, MDBInput, MDBCollapse } from 'mdbreact';
import CollapsePage from './CollapseButton/CollapseButton';
import SingleBorrowedBook from '../BorrowedBooks/SingleBorrowedBook';

const ProfilePage = () => {
    const { user } = useContext(AuthContext);

    const [passwordUpdateMode, setPasswordUpdateMode] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [email, setEmail] = useState('');
    const [userData, setUserData] = useState('');
    const [username, setUsername] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('')
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordRepeat, setNewPasswordRepeat] = useState('');
    const [latestBorrowedBooks, setLatestBorrowedBooks] = useState([]);
    const [borrowedBooks, setBorrowedBooks] = useState([]);
    const [error, setError] = useState('');

    const toggleEditMode = () => {
        setEditMode((editMode) => !editMode)
    }

    const togglePasswordUpdateMode = () => {
        setPasswordUpdateMode((passwordUpdateMode) => !passwordUpdateMode)
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

    useEffect(() => {
        fetch(`http://localhost:4000/books/user/books`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
            }
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.message) {
                    setError(data.message)
                    console.log(data.message)
                } else {
                    setBorrowedBooks(data)
                    setLatestBorrowedBooks(data.slice(data.length - 2, data.length));
                }
            })
    }, []);

    const updateUserData = (username, email) => {
        fetch(`http://localhost:4000/users/${user.sub}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                email: email,
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

    const updatePassword = (oldPassword, newPassword) => {
        fetch(`http://localhost:4000/users/${user.sub}/password`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                oldPassword: oldPassword,
                newPassword: newPassword
            }),
        })
            .then(r => r.json())
            .then(result => {
                if (result.message) {
                    throw new Error(result.message);
                }
            })
            .catch(err => alert(err.message))
    }

    return (
        <>
            <div className="profileInfoContainer" style={{ display: "grid", gridTemplateColumns: "50% 50%", marginTop: "70px" }}>
                <div>
                    <h1 style={{ margin: "40px" }}>Your profile</h1>
                    <div style={{ margin: "70px", fontSize: "22px" }}>
                        <h3>User details</h3>
                        <br></br>
                        <br></br>
                        {editMode ? (
                            <>
                                <p ><MDBIcon icon="user-circle" /> Enter your new username:</p><MDBInput label="Your new username" value={username} onChange={(ev) => setUsername(ev.target.value)} />
                                <br></br>
                                <br></br>
                                <p> <MDBIcon icon="envelope" /> Enter your new email address:</p><MDBInput label="Your new email" value={email} onChange={(ev) => setEmail(ev.target.value)} />
                                <br></br>
                                <br></br>
                            </>
                        ) : (
                                <>
                                    <p ><MDBIcon icon="user-circle" /> Username: {username}</p>
                                    <br></br>
                                    <br></br>
                                    <p> <MDBIcon icon="envelope" /> Email address: {email}</p>
                                    <br></br>
                                    <br></br>
                                </>
                            )
                        }
                        <p> <MDBIcon icon="user-plus" /> Join date: {userData.Joined}</p>
                        <br></br>
                        <br></br>
                        <p> <MDBIcon icon="trophy" /> Current level: {userData.Level} </p>
                        <br></br>
                        <br></br>
                        <p> <MDBIcon icon="gamepad" /> Current read points: {userData.Points} </p>
                        <br></br>
                        <br></br>
                        {!passwordUpdateMode && !editMode ? (
                            <>
                                <MDBBtn onClick={toggleEditMode}>Edit info</MDBBtn> <MDBBtn onClick={togglePasswordUpdateMode}>Change password</MDBBtn>
                            </>
                        ) : (null)
                        }
                        {passwordUpdateMode ? (
                            <>
                                <h3>Change password</h3>
                                <MDBInput label="Enter current password" type="password" value={passwordCheck} onChange={(ev) => setPasswordCheck(ev.target.value)} />
                                <MDBInput label="Enter new password" type="password" value={newPassword} onChange={(ev) => setNewPassword(ev.target.value)} />
                                <MDBInput label="Confirm new password" type="password" value={newPasswordRepeat} onChange={(ev) => setNewPasswordRepeat(ev.target.value)} />
                                <MDBBtn onClick={() => updatePassword(passwordCheck, newPassword)}>Update password</MDBBtn> <MDBBtn onClick={togglePasswordUpdateMode}>Cancel</MDBBtn>
                            </>
                        ) : (null)
                        }
                        {editMode ? (
                            <>
                                <MDBBtn onClick={() => {
                                    updateUserData(username, email)
                                    toggleEditMode()
                                }}>Save changes</MDBBtn> <MDBBtn onClick={toggleEditMode}>Cancel</MDBBtn>
                            </>
                        ) : (null)

                        }
                    </div>
                </div>
                <div>
                    <h1 style={{ margin: "40px" }}>Borrowed books and history</h1>
                    <div style={{ margin: "70px" }}>
                        <h3>Recently borrowed books</h3>
                        <div style={{ display: "grid", gridTemplateColumns: "50% 50%" }}>
                            {latestBorrowedBooks.length !== 0 ? (
                                latestBorrowedBooks.map((book) => <SingleBorrowedBook book={book} key={book.book_Id} />)
                            ) : (<h4 style={{marginTop: "20px", color:"gray"}}>You haven't borrowed any books recently.</h4>)
                            }
                        </div>
                    </div>
                </div >
            </div>
            <div style={{ textAlign: "center" }}>
                <CollapsePage books={borrowedBooks}  />
            </div>
        </>

    )
}

export default ProfilePage;