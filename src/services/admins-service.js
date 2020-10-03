import serviceErrors from './service-errors.js';
import adminsData from '../data/admins-data.js';

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
                user: null,
            };
        }

        const _ = await adminsData.insertBook(bookInfo.title, bookInfo.author, bookInfo.description);

        return { error: null, book: { message: 'Book was successfully added to library!'}};
    };

};

export default {
    getAllUsers,
    getUserById,
    deleteUser,
    createBook,
};