import booksData from '../data/books-data.js';

const getAllBooks = async (filter) => {
    return filter
        ? await booksData.searchBy('title', filter)
        : await booksData.getAll();
};

const getBookById = async (id) => await booksData.getById('id', id);

const getBookReviews = async (id) => {
    return await booksData.getReviews(id);
};

const createReview = async (content, id) => {
    return await booksData.pushReview(content, id);
};

const borrowABook = async (id) => {
    return await booksData.updateBookStatusToBorrowed(id);


};

const returnABook = async (id) => {
    return await booksData.updateBookStatusToFree(id);
};

export default {
    getAllBooks,
    getBookById,
    getBookReviews,
    createReview,
    borrowABook,
    returnABook,
};
