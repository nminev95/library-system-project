import serviceErrors from './service-errors.js';
import booksData from '../data/books-data.js';

const getAllBooks = booksData => {
    return async (queryType, filter) => {

        if (filter) {
            const books = await booksData.searchBy(queryType, filter);
            return mapReviews(books);
        }
        const books = await booksData.getAll();
        return mapReviews(books);
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

        return { error: null, book: mapReviews(book) };
    };
};

const getBorrowerId = booksData => {
    return async (id) => {
        const borrowerId = await booksData.getBookBorrowerId(+id);
   
        if (!borrowerId) {
            return {
                error: serviceErrors.RECORD_NOT_FOUND,
                book: null,
            };
        }

        return { error: null, borrowerId: borrowerId };
    };
};

const getBookReviews = booksData => {
    return async (id) => {
        const reviews = await booksData.getReviews(id);

        if (reviews.length === 0) {
            return {
                error: serviceErrors.RECORD_NOT_FOUND,
                reviews: null,
            };
        }

        return { error: null, reviews: reviews };
    };
};

const createReview = async (content, id) => {
    return await booksData.pushReview(content, id);
};

const mapReviews = (data) => {
    const map = new Map();

    for (const book of data) {
        const { id, Title, Author, Description, Status, Review_Id, Review } = book;
        if (!map.get(id)) {
            map.set(id, {
                id, Title, Author, Description, Status, Reviews: [],
            });
        }
        const reviewObject = {
            id: Review_Id,
            review: Review,
        };
        if (reviewObject.id) {
            map.get(id).Reviews.push(reviewObject);
        } else {
            map.set(id, {
                id, Title, Author, Description, Status, Reviews: 'No reviews for this book yet.',
            });
        }
    }
    return [...map.values()];
};



const borrowABook = booksData => {
    return async (bookID, userID) => {
        const borrowedBook = await booksData.updateBookStatusToBorrowed(bookID, userID);

        if (!borrowedBook) {
            return {
                error: serviceErrors.RECORD_NOT_FOUND,
                borrowedBook: null,
            };
        }

        return { error: null, book: borrowedBook };
    };
};

const returnABook = booksData => {
    return async (bookId) => {
const returnedBook = await booksData.updateBookStatusToFree(+bookId);

        if (!returnedBook) {
            return {
                error: serviceErrors.RECORD_NOT_FOUND,
                borrowedBook: null,
            };
        }

        return { error: null, book: returnedBook };
    };
};


export default {
    getAllBooks,
    getBookById,
    getBorrowerId,
    borrowABook,
    returnABook,
    getBookReviews,
    createReview,
};
