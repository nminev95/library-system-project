/* eslint-disable no-unused-vars */
import serviceErrors from './service-errors.js';

const getAllBooks = booksData => {
    return async (queryType, value) => {

        if (queryType && value) {
            const books = await booksData.searchBy(queryType, value);

            if (books.length === 0) {
                return {
                    error: serviceErrors.RECORD_NOT_FOUND,
                    books: null,
                };
            }

            return { error: null, books: mapReviewsAndRating(books) };

        } else {
            const books = await booksData.getAll();

            if (books.length === 0) {
                return {
                    error: serviceErrors.RECORD_NOT_FOUND,
                    books: null,
                };
            }
            return { error: null, books: mapReviewsAndRating(books) };
        }
    };
};


const getBookById = booksData => {
    return async (id) => {
        if (isNaN(id) || id < 0) {
            return {
                error: serviceErrors.NOT_A_NUMBER,
                book: null,
            };
        }
        const book = await booksData.getById(id);

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
    return async (content, id, userId) => {

        const book = await booksData.getById(+id);

        if (book.length === 0) {
            return {
                error: serviceErrors.RECORD_NOT_FOUND,
                book: null,
            };
        }

        const history = await booksData.getReadHistory(userId);

        if (!(history.some(el => (+(el.book_Id) === id)))) {
            return {
                error: serviceErrors.OPERATION_NOT_PERMITTED,
                reviews: null,
            };
        }

        const bookUserReviews = await booksData.getUserReviews(userId, id);

        if (bookUserReviews.length !== 0) {
            return {
                error: serviceErrors.DUPLICATE_RECORD,
                book: null,
            };
        }
        const reviews = await booksData.pushReview(content, id, userId);
        return { error: null, reviews: reviews };
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

        const book = await booksData.getById(+bookID);

        if (book.length === 0) {
            return {
                error: serviceErrors.RECORD_NOT_FOUND,
                borrowedBook: null,
            };
        }
        const bookStatus = (book[0].Status);

        if (bookStatus === 'Unlisted' || bookStatus === 'Borrowed') {
            return {
                error: serviceErrors.OPERATION_NOT_PERMITTED,
                borrowedBook: null,
            };
        }

        const borrowedBook = await booksData.updateBookStatusToBorrowed(userID, bookID);

        return { error: null, borrowedBook: borrowedBook };
    };
};

const returnABook = booksData => {
    return async (bookId, userId) => {

        const bookInfo = await booksData.getById(+bookId);

        if (bookInfo.length === 0) {
            return {
                error: serviceErrors.RECORD_NOT_FOUND,
                borrowedBook: null,
            };
        }

        const bookStatus = bookInfo[0].Status;
        const borrowerInfo = await booksData.getBookBorrowerId(+bookId);
        const borrowerId = +(borrowerInfo[0].Borrower);

        if (bookStatus === 'Unlisted' || bookStatus === 'Free' || borrowerId !== userId) {
            return {
                error: serviceErrors.OPERATION_NOT_PERMITTED,
                borrowedBook: null,
            };
        }

        const sendDataToHistory = await booksData.sendBookIdToUserHistory(userId, bookId);
        const returnedBook = await booksData.updateBookStatusToFree(+bookId);
        return { error: null, returnedBook: returnedBook };
    };
};

const updateReview = booksData => {
    return async (newReview, reviewId, userId) => {
        const foundReview = await booksData.getReview(reviewId);

        if (foundReview.length === 0) {
            return {
                error: serviceErrors.RECORD_NOT_FOUND,
                review: null,
            };
        }

        const authorId = +(foundReview[0].user_Id);

        if (authorId !== userId) {
            return {
                error: serviceErrors.OPERATION_NOT_PERMITTED,
                review: null,
            };
        }

        const content = await booksData.getReviewByContent(newReview);

        if (content.length !== 0) {
            return {
                error: serviceErrors.DUPLICATE_RECORD,
                review: null,
            };
        }
        const _ = await booksData.updateReview(newReview, reviewId);

        return { error: null, review: { message: 'Review was successfully updated!' } };
    };
};

const deleteReview = booksData => {
    return async (url, userId) => {

        const result = url.match(/[0-9]+/g);
        const bookId = result[0];
        const reviewId = result[1];
        const foundReview = await booksData.getReview(reviewId);

        if (foundReview.length === 0) {
            return {
                error: serviceErrors.RECORD_NOT_FOUND,
                review: null,
            };
        }

        const authorId = +(foundReview[0].user_Id);

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
    return async (bookId, userId, rating) => {
        const book = await booksData.getById(bookId);

        if (book.length === 0) {
            return {
                error: serviceErrors.RECORD_NOT_FOUND,
                rate: null,
            };
        }

        if (rating < 1 || rating > 5) {
            return {
                error: serviceErrors.OPERATION_NOT_PERMITTED,
                rate: null,
            };
        }

        const existingRating = await booksData.getUserRatingsForBook(bookId, userId);

        if (existingRating.length === 0) {
            const _ = await booksData.insertRating(bookId, rating, userId);
            return { 
                error: null, 
                rate: _, 
            };
        } else {
            const currentRating = +(existingRating[0].rating_Id);
            if (currentRating === rating) {
                return { 
                    error: serviceErrors.DUPLICATE_RECORD, 
                    rate: null,
                };
            }
            const _ = await booksData.updateRating(rating, bookId, userId);
            return { error: null, rate: { message: 'You have successfully updated your rate for this book!' } };
        }

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
    updateReview,
    deleteReview,
    rateBook,
};
