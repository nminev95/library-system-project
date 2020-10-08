/* eslint-disable no-unused-vars */
import serviceErrors from './service-errors.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PRIVATE_KEY, DEFAULT_USER_ROLE } from './../config.js';

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

const createUser = usersData => {
    return async (userCreate) => {
        const { username, password, email } = userCreate;

        const existingUser = await usersData.getWithRole(username);

        if (existingUser) {
            return {
                error: serviceErrors.DUPLICATE_RECORD,
                user: null,
            };
        }

        const passwordHash = await bcrypt.hash(password, 10);
        const user = await usersData.create(username, passwordHash, email, DEFAULT_USER_ROLE);

        return { error: null, user: user };
    };
};

const updateUser = usersData => {
    return async (id, userUpdate, loggedUser) => {
        const user = await usersData.getWithRole(userUpdate.username);
        
        if (user) {
            return {
                error: serviceErrors.DUPLICATE_RECORD,
                user: null,
            };
        }

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

const getAllUsers = usersData => {
    return async (filter) => {
        return filter
            ? await usersData.searchBy('username', filter)
            : await usersData.getAll();
    };
};

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

export default {
    signInUser,
    createUser,
    updateUser,
    getAllUsers,
    getUserById,
    deleteUser,
    banUser,
};
