/* eslint-disable no-unused-vars */
import serviceErrors from './service-errors.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PRIVATE_KEY, DEFAULT_USER_ROLE } from './../config.js';

const signInUser = usersData => {
    return async (username, password) => {
        const user = await usersData.getWithRole(username);
        console.log(user)
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
        const user = await usersData.getBy('user_Id', id);
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

const getLoggedUserId = (request) => {
    const requestAuthArray = request.headers.authorization.split(' ');
    const decoded = jwt.verify(requestAuthArray[1], PRIVATE_KEY);
    return decoded.sub;
};

export default {
    signInUser,
    createUser,
    updateUser,
    getLoggedUserId,
};
