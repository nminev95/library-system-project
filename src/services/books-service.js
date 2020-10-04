import booksData from '../data/books-data.js';
import serviceErrors from './service-errors.js';

const getAllBooks = booksData => {
    return async (queryType, filter) => {

        if (filter) {
            const books = await booksData.searchBy(queryType, filter);
            return mapReviewsAndRating(books);
        }
        const books = await booksData.getAll();
        return mapReviewsAndRating(books);
    };
};

const getBookById = booksData => {
    return async (id) => {
        const book = await booksData.getById('user_Id', id);

        if (book.length === 0) {
            return {
                error: serviceErrors.RECORD_NOT_FOUND,
                book: null,
            };
        }

        return { error: null, book: mapReviewsAndRating(book) };
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

const createReview = booksData => {
    return async (review, id, userId) => {
        const history = await booksData.getReadHistory(userId);

        console.log(history[0]);
        // const reviews = await booksData.pushReview(id);

        if (review.length === 0) {
            return {
                error: serviceErrors.RECORD_NOT_FOUND,
                reviews: null,
            };
        }

        return { error: null, reviews: { message: 'Review was added successfully!' } };
    };
};

const mapReviewsAndRating = (data) => {
    const map = new Map();

    for (const book of data) {
        const { id, Title, Author, Description, Status, Review_Id, Review, Rating } = book;

        if (!map.get(id)) {
            map.set(id, {
                id, Title, Author, Description, Status, Reviews: [], Rating,
            });
        }
        const reviewObject = {
            id: Review_Id,
            review: Review,
        };

        if (reviewObject.id) {
            map.get(id).Reviews.push(reviewObject);
            if (map.get(id).Rating === null) {
                const Reviews = map.get(id).Reviews;
                map.set(id, {
                    id, Title, Author, Description, Status, Reviews, Rating: 'Be the first person to rate this book!',
                });
            }
        } else {
            map.set(id, {
                id, Title, Author, Description, Status, Reviews: 'No reviews for this book yet!', Rating,
            });
            if (map.get(id).Rating === null) {
                map.set(id, {
                    id, Title, Author, Description, Status, Reviews: 'No reviews for this book yet.', Rating: 'Be the first person to rate this book!',
                });
            }
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

        return { error: null, borrowedBook: borrowedBook };
    };
};

const returnABook = booksData => {
    return async (bookId) => {
        const returnedBook = await booksData.updateBookStatusToFree(+bookId);

        if (!returnedBook) {
            return {
                error: serviceErrors.RECORD_NOT_FOUND,
                returnedBook: null,
            };
        }

        return { error: null, returnedBook: returnedBook };
    };
};

const sendInfoToUserHistory = booksData => {
    return async (userID, bookID) => {
        const sentData = await booksData.sendBookIdToUserHistory(userID, bookID);

        if (!sentData) {
            return {
                error: serviceErrors.OPERATION_NOT_PERMITTED,
                sentData: null,
            };
        }
        return { error: null, sentData: sentData };
    };
};

const updateReview = booksData => {
    return async (newReview, reviewId, userId) => {
        const foundReview = await booksData.getReview(reviewId);
        const authorId = +(foundReview[0].user_Id);

        if (foundReview.length === 0) {
            return {
                error: serviceErrors.RECORD_NOT_FOUND,
                review: null,
            };
        }

        if (authorId !== userId) {
            return {
                error: serviceErrors.OPERATION_NOT_PERMITTED,
                review: null,
            };
        }

        const _ = await booksData.updateReview(newReview, reviewId);

        return { error: null, review: { message: 'Review was successfully updated!' } };
    };
};

const deleteReview = booksData => {
    return async (bookId, reviewId, userId) => {
        const foundReview = await booksData.getReview(reviewId);
        const authorId = +(foundReview[0].user_Id);

        if (foundReview.length === 0) {
            return {
                error: serviceErrors.RECORD_NOT_FOUND,
                review: null,
            };
        }

        if (authorId !== userId) {
            return {
                error: serviceErrors.OPERATION_NOT_PERMITTED,
                review: null,
            };
        }

        const _ = await booksData.removeReview(bookId, reviewId);

        return { error: null, review: { message: 'Review was successfully deleted!' } };
    };
};

const rateBook = booksData => {
    return async (bookId, rating) => {
        const book = await booksData.getById('book_Id', bookId);

        if (book.length === 0) {
            return {
                error: serviceErrors.RECORD_NOT_FOUND,
                book: null,
            };
        }

        const _ = await booksData.insertRating(bookId, rating);

        return { error: null, review: { message: 'You have successfully rated the book!' } };
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
    sendInfoToUserHistory,
    updateReview,
    deleteReview,
    rateBook,
};
