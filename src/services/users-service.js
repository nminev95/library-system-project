/* eslint-disable no-unused-vars */
import serviceErrors from './service-errors.js';
import bcrypt from 'bcrypt';
import { DEFAULT_USER_ROLE } from './../config.js';

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

const getAllUsers = usersData => {
    return async (filter) => {
        return filter
            ? await usersData.searchBy('username', filter)
            : await usersData.getAll();
    };
};

const getUserById = usersData => {
    return async (id) => {
        const user = await usersData.getBy('user_Id', id);

        if (!user) {
            return {
                error: serviceErrors.RECORD_NOT_FOUND,
                user: null,
            };
        }

        return { error: null, user: user };
    };
};

const createUser = usersData => {
    return async (userCreate) => {
        const { username, password, email } = userCreate;

        const existingUser = await usersData.getBy('username', username);

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
    return async (id, userUpdate) => {
        const user = await usersData.getBy('id', id);
        if (!user) {
            return {
                error: serviceErrors.RECORD_NOT_FOUND,
                user: null,
            };
        }

        if (userUpdate.username && !!(await usersData.getBy('username', userUpdate.username))) {
            return {
                error: serviceErrors.DUPLICATE_RECORD,
                user: null,
            };
        }

        const updated = { ...user, ...userUpdate };
        const _ = await usersData.update(updated);

        return { error: null, user: updated };
    };
};

const deleteUser = usersData => {
    return async (id) => {
        const userToDelete = await usersData.getBy('id', id);
        if (!userToDelete) {
            return {
                error: serviceErrors.RECORD_NOT_FOUND,
                user: null,
            };
        }

        const _ = await usersData.remove(userToDelete);

        return { error: null, user: userToDelete };
    };
};

export default {
    signInUser,
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};
