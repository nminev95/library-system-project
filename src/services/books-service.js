import serviceErrors from './service-errors.js';
import booksData from '../data/books-data.js';

const getAllBooks = booksData => {
    return async (queryType, filter) => {
        return filter
            ? await booksData.searchBy(queryType, filter)
            : await booksData.getAll();
    };
};

const getBookById = booksData => {
    return async (id) => {
        const book = await booksData.getById('id', id);

        if (!book) {
            return {
                error: serviceErrors.RECORD_NOT_FOUND,
                book: null,
            };
        }

        return { error: null, book: book };
    };
};
const getBookReviews = async (id) => {
    return await booksData.getReviews(id);
};

const createReview = async (content, id) => {
    return await booksData.pushReview(content, id);
};

// const borrowABook = async (id) => {
//     return await booksData.updateBookStatusToBorrowed(id);


// };

// const returnABook = async (id) => {
//     return await booksData.updateBookStatusToFree(id);
// };

export default {
    getAllBooks,
    getBookById,
    getBookReviews,
    createReview,
   // borrowABook,
   // returnABook,
};
