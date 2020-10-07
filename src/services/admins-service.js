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
    return async (title, description, author, status) => {
        const foundBook = await adminsData.findBook(title, author);

        if (foundBook.length !== 0) {
            return {
                error: serviceErrors.DUPLICATE_RECORD,
                book: null,
            };
        }

        const _ = await adminsData.insertBook(title, author, description, status);

        return { error: null, book: { message: 'Book was successfully added to library!' } };
    };
};


const updateBook = adminsData => {
    return async (updateInfo, id) => {
        const foundBook = await adminsData.getBook(id);

        if (foundBook.length === 0) {
            return {
                error: serviceErrors.RECORD_NOT_FOUND,
                updatedBook: null,
            };
        }
        
        const updatedBook = { ...foundBook[0], ...updateInfo};
        const _ = adminsData.updateBookInfo(updatedBook);

        return { error: null, updatedBook: updatedBook };
    };
};

const deleteBook = adminsData => {
    return async (id) => {
        const foundBook = await adminsData.getBook(id);

        if (foundBook.length === 0) {
            return {
                error: serviceErrors.RECORD_NOT_FOUND,
                book: null,
            };
        }
        const _ = await adminsData.removeBook(id);

        return { error: null, book: { message: 'Book was successfully deleted!' } };
    };
};

const deleteReview = adminsData => {
    return async (bookId, reviewId) => {
        const foundReview = await adminsData.checkBookForReview(bookId, reviewId);

        if (foundReview.length === 0) {
            return {
                error: serviceErrors.RECORD_NOT_FOUND,
                review: null,
            };
        }

        const _ = await adminsData.removeReview(bookId, reviewId);

        return { error: null, review: { message: 'Review was successfully deleted!' } };
    };
};

const updateReview = adminsData => {
    return async (bookId, reviewId, newReview) => {
        const foundReview = await adminsData.checkBookForReview(bookId, reviewId);

        if (foundReview.length === 0) {
            return {
                error: serviceErrors.RECORD_NOT_FOUND,
                review: null,
            };
        }

        const _ = await adminsData.changeReview(newReview, reviewId);

        return { error: null, review: { message: 'Review was successfully updated!' } };
    };
};

const createReview = adminsData => {
    return async (bookId, userId, newReview) => {
        const foundBook = await adminsData.getBook(bookId);

        if (foundBook.length === 0) {
            return {
                error: serviceErrors.RECORD_NOT_FOUND,
                book: null,
            };
        }

        const _ = await adminsData.insertReview(newReview, bookId, userId);

        return { error: null, review: { message: 'Review was successfully published!' } };
    };
};

const banUser = adminsData => {
    return async (description, expirationDate, userId) => {

        const getIfBanExist = await adminsData.getBanStatus(+userId);

        if (getIfBanExist) {
            return {
                error: serviceErrors.DUPLICATE_RECORD,
                ban: null,
            };

        }
        const sendBanData = await adminsData.sendBannedUserData(description, expirationDate, +userId);

        return { error: null, ban: { message: 'The user is banned!' } };

    };
};


export default {
    getAllUsers,
    getUserById,
    deleteUser,
    createBook,
    updateBook,
    deleteBook,
    deleteReview,
    updateReview,
    createReview,
    banUser,
};