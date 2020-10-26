import React, { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';

const ProfilePage = () => {
    const { user } = useContext(AuthContext);

    console.log(user)
    return (
        <>
        <h1>Your profile</h1>
        <p></p>
        </>
   )
}

export default ProfilePage;