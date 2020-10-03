/* eslint-disable no-unused-vars */
import adminsData from '../data/admins-data.js';
import serviceErrors from './service-errors.js';


const getAllUsers = adminsData => {
    return async (filter) => {
        return filter
            ? await adminsData.searchBy('username', filter)
            : await adminsData.getAll();
    };
};

const getUserById = adminsData => {
    return async (id) => {
        const user = await adminsData.getBy('user_Id', id);

        if (!user) {
            return {
                error: serviceErrors.RECORD_NOT_FOUND,
                user: null,
            };
        }

        return { error: null, user: user };
    };
};

const deleteUser = adminsData => {
    return async (id) => {
        const userToDelete = await adminsData.getBy('user_Id', id);
        if (!userToDelete) {
            return {
                error: serviceErrors.RECORD_NOT_FOUND,
                user: null,
            };
        }

       
        const _ = await adminsData.remove(userToDelete);

        return { error: null, user: userToDelete };
    };
};

const createBook = adminsData => {
    return async (bookInfo) => {
        const foundBook = await adminsData.findBook(bookInfo.title, bookInfo.author);

        if (foundBook.length !== 0) {
            return {
                error: serviceErrors.DUPLICATE_RECORD,
                book: null,
            };
        }

        const _ = await adminsData.insertBook(bookInfo.title, bookInfo.author, bookInfo.description);

        return { error: null, book: { message: 'Book was successfully added to library!' } };
    };
};

const updateBook = adminsData => {
    return async (updateInfo, id) => {
        const foundBook = await adminsData.getBook(id);

        if (foundBook.length === 0) {
            return {
                error: serviceErrors.RECORD_NOT_FOUND,
                book: null,
            };
        }
        
        const _ = await iterateOverBody(updateInfo, id);

        return { error: null, book: { message: 'Book info was successfully updated!' } };
    };
};

const iterateOverBody = (body, id) => {
    for (const update in body) {
        adminsData.updateBookInfo(update, body[update], id);
    }
};


export default {
    getAllUsers,
    getUserById,
    deleteUser,
    createBook,
    updateBook,
};