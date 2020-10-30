/* eslint-disable no-unused-vars */
import serviceErrors from './service-errors.js';
import bcrypt from 'bcrypt';
import { DEFAULT_USER_ROLE } from './../config.js';

/**
* Signing in the user.
* @param module user data SQL queries module.
* @callback 
* @async
* @param {string} username - The unique username.
* @param {string} password - User password.
* @return {Promise<object>}
*/
const signInUser = usersData => {
    return async (username, password) => {
        const user = await usersData.getWithRole(username);
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return {
                error: serviceErrors.INVALID_SIGNIN,
                user: null,
            };
        }

        return {
            error: null,
            user: user,
        };
    };
};


/**
* Creates a new user record into the system. 
* @param module users data SQL queries module.
* @callback 
* @async
* @param {string} username - The unique username.
* @param {string} password - User password.
* @param {string} email - User's email.
* @return {Promise<object>}
*/

const createUser = usersData => {
    return async (userCreate) => {
        const { username, password, passwordConfirm, email } = userCreate;

        const existingUser = await usersData.getWithRole(username);

        if (existingUser) {
            return {
                error: serviceErrors.DUPLICATE_RECORD,
                user: null,
            };
        }

        if (password !== passwordConfirm) {
            return {
                error: serviceErrors.NO_MATCH,
                user: null,
            };
        }


        const passwordHash = await bcrypt.hash(password, 10);
        const user = await usersData.create(username, passwordHash, email, DEFAULT_USER_ROLE);

        return { error: null, user: user };
    };
};

/**
* Updates an existing  user's information.
* @param module books data SQL queries module.
* @callback 
* @async
* @param {number} queryType - The unique user number to be updated.
* @param {object} queryType - The information to be updated. 
* @param {number} value - The unique user number trying to update some infomraton.
* @return {Promise<object>}
*/
const updateUser = usersData => {
    return async (id, userUpdate, loggedUser) => {
        const user = await usersData.getWithRole(userUpdate.username);

        // if (user) {
        //     return {
        //         error: serviceErrors.DUPLICATE_RECORD,
        //         user: null,
        //     };
        // }

        if (+(id) !== +(loggedUser.id)) {
            return {
                error: serviceErrors.OPERATION_NOT_PERMITTED,
                user: null,
            };
        }

        const updated = { ...loggedUser, ...userUpdate };
        const _ = await usersData.update(updated);

        return { error: null, user: updated };
    };
};

const updateUserPassword = usersData => {
    return async (id, userUpdate, loggedUser) => {
        const user = await usersData.getWithRole(loggedUser.username);

        if (+(id) !== +(loggedUser.id)) {
            return {
                error: serviceErrors.OPERATION_NOT_PERMITTED,
                user: null,
            };
        }

        if (!(await bcrypt.compare(userUpdate.oldPassword, user.password))) {
            return {
                error: serviceErrors.NO_MATCH,
                user: null,
            };
        } else {
            const passwordHash = await bcrypt.hash(userUpdate.newPassword, 10);
            const _ = await usersData.updatePass(passwordHash, id)
        }

        return { error: null, user: 'Password was updated successfully!' };
    };
};
/**
* Gets all users information.
* @param module users data SQL queries module.
* @callback 
* @async
* @param {string} filter - The username to search by.
* @return {Promise<object>}
*/
const getAllUsers = usersData => {
    return async (username) => {
        return username
            ? await usersData.searchBy('username', username)
            : await usersData.getAll();
    };
};

/**
* Gets user information found by unique user number.
* @param module users data SQL queries module.
* @callback 
* @async
* @param {number} id - The unique user number.
* @return {Promise<object>}
*/
const getUserById = usersData => {
    return async (id) => {
        const user = await usersData.searchBy('user_Id', id);

        if (!user) {
            return {
                error: serviceErrors.RECORD_NOT_FOUND,
                user: null,
            };
        }

        return { error: null, user: user };
    };
};

/**
* Deletes user found by unique user number from the database.
* @param module users data SQL queries module.
* @callback 
* @async
* @param {number} id - The unique user number.
* @return {Promise<object>}
*/
const deleteUser = usersData => {
    return async (id) => {
        const userToDelete = await usersData.searchBy('user_Id', id);

        if (!userToDelete) {
            return {
                error: serviceErrors.RECORD_NOT_FOUND,
                user: null,
            };
        }


        const _ = await usersData.removeUser(id);

        return { error: null, user: userToDelete };
    };
};

/**
* Forbids some user's requests. 
* @param module users data SQL queries module.
* @callback 
* @async
* @param {string} description - Reasons to ban a certain user.
* @param {number} date - The ban term.
* @param {number} id - The unique user number.
* @param {number} id - The unique admin number.
* @return {Promise<object>}
*/
const banUser = (usersData) => {
    return async (description, expirationDate, userId, adminId) => {

        const user = await usersData.searchBy('user_Id', userId);

        if (!user) {
            return {
                error: serviceErrors.RECORD_NOT_FOUND,
                ban: null,
            };
        }
        if (userId === adminId) {
            return {
                error: serviceErrors.OPERATION_NOT_PERMITTED,
                ban: null,
            };
        }

        const getIfBanExist = await usersData.getBanStatus(+userId);

        if (getIfBanExist) {
            return {
                error: serviceErrors.DUPLICATE_RECORD,
                ban: null,
            };
        }
        const sendBanData = await usersData.sendBannedUserData(description, expirationDate, +userId);

        return { error: null, ban: { message: 'The user is banned!' } };
    };
};

/**
* Removes user ban records. 
* @param module books data SQL queries module.
* @callback 
* @async
* @param {object} user information -  All the available user information.
* @return {Promise<object>}
*/
const removeBan = (usersData) => {
    return async (userInfo) => {
        const userId = userInfo.id;

        const status = await usersData.getBanStatus(userId);
        const remove = await usersData.deleteBan(status.idban_status);
    };
};

export default {
    signInUser,
    createUser,
    updateUser,
    getAllUsers,
    getUserById,
    deleteUser,
    banUser,
    removeBan,
    updateUserPassword
};
