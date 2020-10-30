import booksData from '../data/books-data.js';
/* eslint-disable no-unused-vars */
import serviceErrors from './service-errors.js';

/**
* Gets all books information from the database.
* @param module books data SQL queries module.
* @callback 
* @async
* @param {string} query type 
* @param {any} value - Value to search a book by.
* @return {Promise<object>}
*/
const getAllBooks = booksData => {
    return async (query, page) => {
        if (Object.keys(query).length !== 0) {

            const title = query.title || null;
            const author = query.author || null;
            const genre = query.genre || null;
            const search = query.search || null;

            const books = await booksData.searchQuery(title, author, genre, search);
            const res = await mapReviewsAndRating(books);

            if (books.length === 0) {
                return {
                    error: serviceErrors.RECORD_NOT_FOUND,
                    books: null,
                };
            }
            return { error: null, books: [...res] };
        } else {
            if (page) {
                const books = await booksData.getPageResult((page - 1) * 5);

                books.forEach(b => {
                    if (b.Rating === null) {
                        b.Rating = 'Be the first person to rate this book!';
                    }
                });

                if (books.length === 0) {
                    return {
                        error: serviceErrors.RECORD_NOT_FOUND,
                        books: null,
                    };
                }

                return { error: null, books: books };
            } else {
                const books = await booksData.getAllBasicInfo();
                if (books.length === 0) {
                    return {
                        error: serviceErrors.RECORD_NOT_FOUND,
                        books: null,
                    };
                }
                books.forEach(b => {
                    if (b.Rating === null) {
                        b.Rating = 'Be the first person to rate this book!';
                    }
                });
                return { error: null, books: books };
            }
        }
    };
};


/**
* Gets book information found by unique book number in the database.
* @param module books data SQL queries module.
* @callback 
* @async
* @param {number} id - The unique book number.
* @return {Promise<object>}
*/
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

const getPage = booksData => {
    return async (pageNumber, query) => {
        const search = query.search || null;

        const limit = 9;
        const offset = (pageNumber - 1) * limit;
        const page = await booksData.getPageResult(limit, offset, search);     
        const [{ count }] = await booksData.getBooksCount();

        return {
            books: page,
            count: count,
            currentPage: pageNumber,
            hasNext: (offset + limit) < count,
            hasPrevious: pageNumber > 1
        };
    }
}

/**
* Gets all revies found in the database.
* @param module books data SQL queries module.
* @callback 
* @async
* @return {Promise<object>}
*/
const getAllReviews = booksData => {
    return async () => {
        const reviews = await booksData.getReviewsInDatabase();

        if (reviews.length === 0) {
            return {
                error: serviceErrors.RECORD_NOT_FOUND,
                reviews: null,
            };
        }
        return { error: null, reviews: reviews };
    };
};

const getBorrowedBooks = booksData => {
    return async (user_Id) => {
        const books = await booksData.borrowedByUser(user_Id);

        if (books.length === 0) {
            return {
                error: serviceErrors.RECORD_NOT_FOUND,
                books: null,
            };
        }
        return { error: null, books: books };
    };
};

/**
* Creates a new book record in the database.
* @param module books data SQL queries module.
* @callback 
* @async
* @param {string} title - The book title.
* @param {string} description - A short description of the book content.
* @param {string} author - The book author.
* @param {number} id - The status unique number.
* @return {Promise<object>}
*/
const createBook = booksData => {
    return async (title, description, author, genre, year, status, cover) => {
        const foundBook = await booksData.findBook(title, author);

        if (foundBook.length !== 0) {
            return {
                error: serviceErrors.DUPLICATE_RECORD,
                book: null,
            };
        }

        const _ = await booksData.insertBook(title, author, description, genre, year, status, cover);

        return { error: null, book: { message: 'Book was successfully added to library!' } };
    };
};


/**
* Finds and updates a book record in the database.
* @param module books data SQL queries module.
* @callback 
* @async
* @param {object} book information - An object containing all the new information.
* @param {number} id - The status unique number.
* @return {Promise<object>}
*/
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

/**
* Deletes a book record found in the database.
* @param module users data SQL queries module.
* @callback 
* @async
* @param {number} id - The unique book number.
* @return {Promise<object>}
*/
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


/**
* Gets the unique user number, who borrowed a certain book. 
* @param module books data SQL queries module.
* @callback 
* @async
* @param {number} id - The unique book number.
* @return {Promise<object>}
*/
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


/**
* Gets all reviews from the database.
* @param module books data SQL queries module.
* @callback 
* @async
* @param {number} id - The unique review number.
* @return {Promise<object>}
*/
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


/**
* Creates a new review record in the database.
* @param module books data SQL queries module.
* @callback 
* @async
* @param {number} id - The book unique number to search by.
* @param {number} id - The user unique number to search by in user history records.
* @param {string} content - A short opinion about a certain book.
* @param {string} role - The role of the user.
* @return {Promise<object>}
*/
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

            const bookUserReviews = await booksData.getUserReviews(userId, id);

            if (bookUserReviews.length !== 0) {
                return {
                    error: serviceErrors.DUPLICATE_RECORD,
                    book: null,
                };
            }
            const reviews = await booksData.pushReview(content, id, userId);
            return { error: null, reviews: {content, id, userId} };
        } else {
            const book = await booksData.getById(+id);

            if (book.length === 0) {
                return {
                    error: serviceErrors.RECORD_NOT_FOUND,
                    book: null,
                };
            }

            const bookUserReviews = await booksData.getUserReviews(userId, id);

            if (bookUserReviews.length !== 0) {
                return {
                    error: serviceErrors.DUPLICATE_RECORD,
                    book: null,
                };
            }
            
            const _ = await booksData.pushReview(content, id, userId);
            return { error: null, reviews: { content, id, userId } };
        }
    };
};


/**
* Updates a book status when an user borrows it in the database.
* @param module books data SQL queries module.
* @callback 
* @async
* @param {number} id - The unique book number.
* @param {number} id - The unique user number.

* @return {Promise<object>}
*/
const borrowABook = booksData => {
    return async (userID, bookID) => {
        
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

/**
* Updates a book status and send a record to the database when an user returns a book.
* @param module books data SQL queries module.
* @callback 
* @async
* @param {number} id - The unique book number.
* @param {number} id - The unique user number.

* @return {Promise<object>}
*/
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


/**
* Updates an existing review content in the database.
* @param module books data SQL queries module.
* @callback 
* @async
* @param {number} id - The unique review number.
* @param {string} content - New review content to be saved in the database.
* @param {number} id - The unique user number.
* @param {string} role - The user role.
* @return {Promise<object>}
*/
const updateReview = booksData => {
    return async (reviewId, content, userId, role) => {
      

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

            const oldContent = await booksData.getReviewByContent(content, reviewId);

            if (oldContent.length !== 0) {
                return {
                    error: serviceErrors.DUPLICATE_RECORD,
                    review: null,
                };
            }
            const _ = await booksData.updateReview(content, reviewId);

            return { error: null, review: { message: 'Review was successfully updated!' } };
        } else {
            const foundReview = await booksData.getReview(reviewId);

            if (foundReview.length === 0) {
                return {
                    error: serviceErrors.RECORD_NOT_FOUND,
                    review: null,
                };
            }

            const _ = await booksData.updateReview(content, reviewId);

            return { error: null, review: { message: 'Review was successfully updated!' } };
        }
        };
    };

/**
* Deletes review from the database.
* @param module books data SQL queries module.
* @callback 
* @async
* @param {string} url - The original URL.
* @param {number} id - The unique user number.
* @param {string} role - The user role.
* @return {Promise<object>}
*/
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


/**
* Creates and sends a new rate record to the database.
* @param module books data SQL queries module.
* @callback 
* @async
* @param {number} id- The unique user number.
* @param {number} id - The unique user number.
* @param {number} value - The rate value.
* @return {Promise<object>}
*/
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

/**
* Sends a review vote to the database.
* @param module books data SQL queries module.
* @callback 
* @async
* @param {number} id- The unique voted review number.
* @param {number} id - The unique user number.
* @param {number} value - The rate value.
* @return {Promise<object>}
*/
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
                const _ = await booksData.updateVote(vote, reviewId, userId);
                return { error: null, review: { message: 'Your vote has been updated!' } };
            } else if (currentVote === 1 && vote === 1) {
                return { error: null, review: { message: 'You have already liked this review!' } };
            } else if (currentVote === 2 && vote === 2) {
                return { error: null, review: { message: 'You have already disliked this review!' } };
            } else {
                const _ = await booksData.updateVote(vote, reviewId, userId);
                return { error: null, review: { message: 'Your vote has been updated!' } };
            }
        }

    };
};

/** 
* Gets some data and maps it.
* @async
* @param {object} object - An object to be mapped.
* @returns {object} Object
*/
const mapReviewsAndRating = async (data) => {
    const map = new Map();

    for (const book of data) {
        const { id, Title, Author, Description,Borrower, Genre, Year, Cover, Status, Review_Id, Review, ReviewAuthor, Rating, TimesBorrowed } = book;
        const likes = await booksData.getReviewLikes(Review_Id);
        const dislikes = await booksData.getReviewDislikes(Review_Id);

        if (!map.get(id)) {
            map.set(id, {
                id, Title, Author, Description, Borrower, Genre, Year, Cover, Status, TimesBorrowed, Reviews: [], Rating,
            });
        }

        const reviewObject = {
            id: Review_Id,
            Review: Review,
            By: ReviewAuthor,
            Likes: likes,
            Dislikes: dislikes,
        };

        if (reviewObject.id) {
            map.get(id).Reviews.push(reviewObject);
            if (map.get(id).Rating === null) {
                const Reviews = map.get(id).Reviews;
                map.set(id, {
                    id, Title, Author, Description, Borrower, Genre, Year, Cover, Status, TimesBorrowed, Reviews, Rating: 'Be the first person to rate this book!',
                });
            }
        } else {
            map.set(id, {
                id, Title, Author, Description, Borrower, Genre, Year, Cover, Status, TimesBorrowed, Reviews: 'No reviews for this book yet!', Rating,
            });
            if (map.get(id).Rating === null) {
                map.set(id, {
                    id, Title, Author, Description, Borrower,  Genre, Year, Cover, Status, TimesBorrowed, Reviews: 'No reviews for this book yet.', Rating: 'Be the first person to rate this book!',
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
    getAllReviews,
    getBorrowedBooks,
    getPage
};
