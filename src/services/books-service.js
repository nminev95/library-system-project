import booksData from '../data/books-data.js';
/* eslint-disable no-unused-vars */
import serviceErrors from './service-errors.js';

/**
* @param module books data SQL queries module.
* @callback 
* @async
* @param {string} queryType - query to search with. 
* @param {string} value - search term.
*/
const getAllBooks = booksData => {
    return async (query) => {
        if (Object.keys(query).length !== 0) {
            const title = query.title || null;
            const author = query.author || null;

            const books = await booksData.searchQuery(title, author);
            const res = await mapReviewsAndRating(books);

            if (books.length === 0) {
                return {
                    error: serviceErrors.RECORD_NOT_FOUND,
                    books: null,
                };
            }

            return { error: null, books: [...res] };

        } else {
            const books = await booksData.getAll();
            const res = await mapReviewsAndRating(books);


            if (books.length === 0) {
                return {
                    error: serviceErrors.RECORD_NOT_FOUND,
                    books: null,
                };
            }
            return { error: null, books: [...res] };
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
        const res = await mapReviewsAndRating(book);

        return { error: null, book: [...res] };
    };
};

const createBook = booksData => {
    return async (title, description, author, status) => {
        const foundBook = await booksData.findBook(title, author);

        if (foundBook.length !== 0) {
            return {
                error: serviceErrors.DUPLICATE_RECORD,
                book: null,
            };
        }

        const _ = await booksData.insertBook(title, author, description, status);

        return { error: null, book: { message: 'Book was successfully added to library!' } };
    };
};

const updateBook = booksData => {
    return async (updateInfo, id) => {
        const foundBook = await booksData.getById(id);

        if (foundBook.length === 0) {
            return {
                error: serviceErrors.RECORD_NOT_FOUND,
                updatedBook: null,
            };
        }

        const updatedBook = { ...foundBook[0], ...updateInfo };
        const _ = booksData.updateBookInfo(updatedBook);

        return { error: null, updatedBook: updatedBook };
    };
};

const deleteBook = booksData => {
    return async (id) => {
        const foundBook = await booksData.getById(id);

        if (foundBook.length === 0) {
            return {
                error: serviceErrors.RECORD_NOT_FOUND,
                book: null,
            };
        }
        const _ = await booksData.removeBook(id);

        return { error: null, book: { message: 'Book was successfully deleted!' } };
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
    return async (id, userId, content, role) => {
        if (role === 'user') {
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
        } else {
            const book = await booksData.getById(+id);

            if (book.length === 0) {
                return {
                    error: serviceErrors.RECORD_NOT_FOUND,
                    book: null,
                };
            }
            const _ = await booksData.pushReview(content, id, userId);
            return { error: null, review: { message: 'Review was successfully published!' } };
        }
    };
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
    return async (reviewId, newReview, userId, role) => {

        if (role === 'user') {
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

            const oldContent = await booksData.getReviewByContent(newReview, reviewId);

            if (oldContent.length !== 0) {
                return {
                    error: serviceErrors.DUPLICATE_RECORD,
                    review: null,
                };
            }
            const _ = await booksData.updateReview(newReview, reviewId);

            return { error: null, review: { message: 'Review was successfully updated!' } };
        } else {
            const foundReview = await booksData.getReview(reviewId);

            if (foundReview.length === 0) {
                return {
                    error: serviceErrors.RECORD_NOT_FOUND,
                    review: null,
                };
            }

            const _ = await booksData.updateReview(newReview, reviewId);

            return { error: null, review: { message: 'Review was successfully updated!' } };
        }
    };
};

const deleteReview = booksData => {
    return async (url, userId, role) => {
        const result = url.match(/[0-9]+/g);
        const bookId = result[0];
        const reviewId = result[1];

        if (role === 'user') {
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
        } else {

            const foundReview = await booksData.getReview(reviewId);

            if (foundReview.length === 0) {
                return {
                    error: serviceErrors.RECORD_NOT_FOUND,
                    review: null,
                };
            }

            const _ = await booksData.removeReview(bookId, reviewId);

            return { error: null, review: { message: 'Review was successfully deleted!' } };
        }
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

        const history = await booksData.getReadHistory(userId);

        if (!(history.some(el => (+(el.book_Id) === bookId)))) {
            return {
                error: serviceErrors.OPERATION_NOT_PERMITTED,
                reviews: null,
            };
        }

        if (rating < 1 || rating > 5) {
            return {
                error: serviceErrors.NOT_A_NUMBER,
                rate: null,
            };
        }

        const existingRating = await booksData.getUserRatingsForBook(bookId, userId);

        if (existingRating.length === 0) {
            const _ = await booksData.insertRating(bookId, rating, userId);
            return {
                error: null,
                rate: { message: 'You have successfully rated the book!' },
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

const voteReview = booksData => {
    return async (reviewId, userId, vote) => {
        const review = await booksData.getReview(reviewId);

        if (review.length === 0) {
            return {
                error: serviceErrors.RECORD_NOT_FOUND,
                book: null,
            };
        }
        const authorId = +(review[0].user_Id);
        const existingVote = await booksData.getUserVoteForBook(reviewId, userId);

        if (existingVote.length === 0) {
            const _ = await booksData.insertVote(reviewId, vote, userId);
            return { error: null, review: { message: 'Your vote is saved!' }, author: authorId };
        } else {
            const currentVote = +(existingVote[0].vote_Id);
            if (currentVote === 1 && vote === 2) {
                const _ = await booksData.updateVote(2, reviewId, userId);
                return { error: null, review: { message: 'Your vote has been updated!' } };
            } else if (currentVote === 1 && vote === 1) {
                return { error: null, review: { message: 'You have already liked this review!' } };
            } else if (currentVote === 2 && vote === 2) {
                return { error: null, review: { message: 'You have already disliked this review!' } };
            } else {
                const _ = await booksData.updateVote(1, reviewId, userId);
                return { error: null, review: { message: 'Your vote has been updated!' } };
            }
        }

    };
};

const mapReviewsAndRating = async (data) => {
    const map = new Map();

    for (const book of data) {
        const { id, Title, Author, Description, Status, Review_Id, Review, Rating } = book;
        const likes = await booksData.getReviewLikes(Review_Id);
        const dislikes = await booksData.getReviewDislikes(Review_Id);

        if (!map.get(id)) {
            map.set(id, {
                id, Title, Author, Description, Status, Reviews: [], Rating,
            });
        }
        const reviewObject = {
            id: Review_Id,
            review: Review,
            likes: likes,
            dislikes: dislikes,
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

    return map.values();
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
    createBook,
    updateBook,
    deleteBook,
    voteReview,
};
