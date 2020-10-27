import pool from './pool.js';

/** 
* Gets all books from the database. 
* @async
* @returns {Promise<object>} Promise with data from the database.
*/
const getAllBasicInfo = async () => {
    const sql = `
    SELECT
            b.book_Id AS id,
            b.title AS Title, 
            b.author AS Author, 
            b.description as 'Description',
            b.genre as Genre,
            b.year as Year,
            b.imageUrl as Cover,
            s.type as Status,
            ROUND(AVG(rr.rating_value), 2) as Rating
        from 
            books b
        join 
            status s
        on 
            s.status_Id = b.borrowedStatus_Id
        LEFT JOIN   
            books_has_book_ratings br 
        ON 
            b.book_Id = br.book_to_be_rated_Id
        LEFT JOIN 
            book_ratings rr 
        ON 
            br.rating_Id = rr.rating_Id
        GROUP BY 
            IFNULL(b.book_Id, b.description)
        `;

    return await pool.query(sql);
};

/** 
* Gets book info from the database found by unique book number.
* @async
* @param {number} id - The book's id in the database to search by.
* @returns {Promise<object>} Promise with the book's data if found in the database.
*/
const getById = async (value) => {
    const sql = `
        SELECT
            b.book_Id AS id,
            b.title AS Title, 
            b.author AS Author, 
            b.description as 'Description',
            b.genre as Genre,
            b.year as Year,
            b.imageUrl as Cover,
            s.type as Status,
            r.review_Id as Review_Id,
            r.content as Review,
            (SELECT username FROM users WHERE r.user_Id = user_Id) as ReviewAuthor,
            (SELECT COUNT(*) FROM users_history WHERE book_Id = ?) as TimesBorrowed,
            ROUND(AVG(rr.rating_value), 2) as Rating
        from 
            books b
        LEFT OUTER JOIN
            reviews r
        ON 
            b.book_Id = r.book_Id
        join 
            status s
        on 
            s.status_Id = b.borrowedStatus_Id
        LEFT JOIN   
            books_has_book_ratings br 
        ON 
            b.book_Id = br.book_to_be_rated_Id
        LEFT JOIN 
            book_ratings rr 
        ON 
            br.rating_Id = rr.rating_Id
        WHERE 
            b.book_Id = ?
        GROUP BY 
            IFNULL(r.review_Id, b.description);
        `;

    return await pool.query(sql, [value, value]);
};

const borrowedByUser = async(user_Id) =>{
    const sql = `
    SELECT *
    FROM books
    WHERE borrower_Id = ?`;
    return await pool.query(sql, [user_Id]);
};

const getPageResult = async (offset) => {
    const sql = `
            SELECT
            b.book_Id AS id,
            b.title AS Title, 
            b.author AS Author, 
            b.description as 'Description',
            b.genre as Genre,
            b.year as Year,
            b.imageUrl as Cover,
            s.type as Status,
            ROUND(AVG(rr.rating_value), 2) as Rating
        from 
            books b
        join 
            status s
        on 
            s.status_Id = b.borrowedStatus_Id
        LEFT JOIN   
            books_has_book_ratings br 
        ON 
            b.book_Id = br.book_to_be_rated_Id
        LEFT JOIN 
            book_ratings rr 
        ON 
            br.rating_Id = rr.rating_Id
        GROUP BY 
            IFNULL(b.book_Id, b.description)
        LIMIT 5
        OFFSET ${offset}
        `;

    return await pool.query(sql, [offset]);
};

/** 
* Gets all review's votes info from the database found by unique review number.
* @async
* @param {number} id - The review's id in the database to search by.
* @returns {Promise<object>} Promise with the review's votes data if found any.
*/
const getReviewVotes = async (reviewId) => {
    const sql = `select r.review_Id, r.content, v.type_of_vote 
    from reviews r
    join reviews_have_votes rv
    on r.review_Id = rv.review_Id
    join reviews_votes v
    ON rv.vote_Id = v.vote_Id
    WHERE r.review_Id = ?`;

    return await pool.query(sql, [reviewId]);
};


/** 
* Gets all book's reviews info from the database.
* @async
* @param {number} id - The book's id in the database to search by.
* @returns {Promise<object>} Promise with the book's reviews data if found in the database.
*/
const getReviewsInDatabase = async (value) => {
    const sql = `
        SELECT 
            r.review_Id as id, 
            r.content as Review,
            u.username as Author,
            (select COUNT(*) AS Likes from reviews_have_votes WHERE review_id = r.review_id AND vote_Id = 1) as Likes,
            (select COUNT(*) AS Likes from reviews_have_votes WHERE review_id = r.review_id AND vote_Id = 2) as Dislikes,
            r.book_Id as Book
            from 
            reviews r
            left join 
            users u
            on 
            r.user_Id = u.user_Id
            left join 
            reviews_have_votes rv
            ON 
            rv.review_Id = r.review_Id
            `;
            
            return await pool.query(sql, [value]);
        };
        
        /** 
         * Gets all book's reviews info from the database found by unique book number.
         * @async
         * @param {number} id - The book's id in the database to search by.
         * @returns {Promise<object>} Promise with the book's reviews data if found in the database.
         */
        const getReviews = async (value) => {
            const sql = `
            SELECT 
            r.review_Id as review_id, 
            r.content as Review,
            u.user_Id as Author_Id,
            u.username as Author,
            (select COUNT(*) AS Likes from reviews_have_votes WHERE review_id = r.review_id AND vote_Id = 1) as Likes,
            (select COUNT(*) AS Likes from reviews_have_votes WHERE review_id = r.review_id AND vote_Id = 2) as Dislikes,
            r.book_Id as Book
        from 
            reviews r
        left join 
            users u
        on 
            r.user_Id = u.user_Id
        left join 
            reviews_have_votes rv
        ON 
            rv.review_Id = r.review_Id
        WHERE 
            book_Id = ?
        `;

    return await pool.query(sql, [value]);
};

/** 
* Gets book info from the database. 
* @async
* @param {string} column - The column in the database to search in.
* @param {any} value - The value to search for in the column.
* @returns {Promise<object>} Promise with the book data if found in the database.
*/
const searchBy = async (column, value) => {
    const sql = `
        SELECT
            b.book_Id AS id,
            b.title AS Title, 
            b.author AS Author, 
            b.description as 'Description',
            s.type as Status,
            r.review_Id as Review_Id,
            r.content as Review,
            ROUND(AVG(rr.rating_value), 2) as Rating
        from 
            books b
        LEFT OUTER JOIN
            reviews r
        ON 
            b.book_Id = r.book_Id
        join 
            status s
        on 
            s.status_Id = b.borrowedStatus_Id
        LEFT JOIN   
            books_has_book_ratings br 
        ON 
            b.book_Id = br.book_to_be_rated_Id
        LEFT JOIN 
            book_ratings rr 
        ON 
            br.rating_Id = rr.rating_Id
        WHERE 
            ${column}
        LIKE
            '%${value}%'
        GROUP BY 
            IFNULL(r.review_Id, b.description);
        `;


    return await pool.query(sql);

};

const searchQuery = async (title, author, genre, search) => {
    const sql = `
        SELECT
            b.book_Id AS id,
            b.title AS Title, 
            b.author AS Author, 
            b.description as 'Description',
            b.genre as Genre,
            b.year as Year,
            b.imageUrl as Cover,
            s.type as Status,
            r.review_Id as Review_Id,
            r.content as Review,
            (SELECT username FROM users WHERE r.user_Id = user_Id) as ReviewAuthor,
            (SELECT COUNT(*) FROM users_history WHERE book_Id = id) as TimesBorrowed,
            ROUND(AVG(rr.rating_value), 2) as Rating
        from 
            books b
        LEFT OUTER JOIN
            reviews r
        ON 
            b.book_Id = r.book_Id
        join 
            status s
        on 
            s.status_Id = b.borrowedStatus_Id
        LEFT JOIN   
            books_has_book_ratings br 
        ON 
            b.book_Id = br.book_to_be_rated_Id
        LEFT JOIN 
            book_ratings rr 
        ON 
            br.rating_Id = rr.rating_Id
        WHERE 
            (? IS NULL OR title LIKE '%${title}%')
        AND 
            (? IS NULL OR author LIKE '%${author}%')
        AND 
            (? IS NULL OR genre LIKE '%${genre}%')
        AND 
            (? IS NULL OR title LIKE '%${search}%')
        GROUP BY 
            IFNULL(r.review_Id, b.description);
        `;

    return await pool.query(sql, [title, author, genre, search]);
};
/** 
* Creates a new book review in the database. 
* @async
* @param {string} content - Review content.
* @param {number} id - The unique book number.
* @param {number} user id - The unique user number.
* @returns {Promise<object>}
*/
const pushReview = async (content, id, userId) => {
    const sql = `
        INSERT INTO
            reviews(content, book_Id, user_Id) 
        VALUES
            (?, ?, ?)`;

    return await pool.query(sql, [content, id, userId]);
};

/** 
* Updates the book status to "Borrowed" when an user borrows it.  
* @async
* @param {number}  id - The uniique user number. 
* @param {number}  id - The unique book number.
* @returns {Promise<object>}
*/
const updateBookStatusToBorrowed = async ( user_id, book_id) => {
    const sql = `
        UPDATE books SET
          borrowedStatus_Id = (SELECT status_Id FROM status WHERE type = 'Borrowed'),
          borrower_Id = ?
        WHERE book_Id = ?
    `;
    return await pool.query(sql, [user_id, book_id]);
};

/** 
* Updates the book status to "Free" when an user returns it.  
* @async
* @param {number}  id - The uniique user number. 
* @param {number}  id - The unique book number.
* @returns {Promise<object>}
*/
const updateBookStatusToFree = async (book_id) => {
    const sql = `
        UPDATE books SET
          borrowedStatus_Id = (SELECT status_Id FROM status WHERE type = 'Free'),
          borrower_Id = '0'
        WHERE book_Id = ?
    `;
    return await pool.query(sql, [book_id]);
};

/** 
* Gets the unique user number from the database. 
* @async
* @param {number} id - The unique book number in the database to search by.
* @returns {Promise<object>} Promise with the user data if found in the database.
*/
const getBookBorrowerId = async (book_id) => {
    const sql = `
        SELECT
            b.borrower_Id AS Borrower
        from 
            books b
        WHERE 
            b.book_Id = ?;
        `;

    return await pool.query(sql, [book_id]);
};

/** 
* Creates a new record in the database. 
* @async
* @param {number} id - The user unique number.
* @param {number} id - The book unique number.
* @returns {Promise<object>}
*/
const sendBookIdToUserHistory = async (userId, bookId) => {
    const sql = `
        INSERT INTO 
            users_history (user_Id, book_Id)
        VALUES 
            (?,?)`;

    return await pool.query(sql, [userId, bookId]);
};

/** 
* Removes a review from the database (resets its status to "Deleted")
* @async
* @param {number} id - The unique review number to delete by.
* @returns {Promise<object>} Promise.
*/
const deleteReview = async (id) => {
    const sql = `
        UPDATE reviews SET
            isDeleted = ? 
        WHERE 
            review_Id = ?
        `;

    return await pool.query(sql, [1, id]);
};

/** 
* Gets user history info from the database. 
* @async
* @param {number} id - The unique user number to search by. 
* @returns {Promise<object>} Promise with the user history data (all the books the has read)if found in the database.
*/
const getReadHistory = async (id) => {
    const sql = `
    SELECT 
    *
    FROM users_history
    WHERE user_Id = ?
    `;

    return await pool.query(sql, [id]);
};

/** 
* Gets a review from the database. 
* @async
* @param {number} id - The unique review number to search by. 
* @returns {Promise<object>} Promise with the review data if found in the database.
*/
const getReview = async (reviewId) => {
    const sql = `
    SELECT 
        * 
    FROM 
        reviews 
    WHERE 
        review_Id = ?
    `;

    return await pool.query(sql, [reviewId]);
};

/** 
* Updates a review content in the database. 
* @async
* @param {string} content - The content to be saved. 
* @param {number} id - The unique review number.
* @returns {Promise<object>} Promise.
*/
const updateReview = async (content, id) => {
    const sql = `
        UPDATE reviews SET
            content = ? 
        WHERE 
            review_Id = ?
        `;

    return await pool.query(sql, [content, id]);
};

/** 
* Removes a review  for a certain book from the database. 
* @async
* @param {number} id - The unique book number.
* @param {number} id - The unique review number to be deleted.
* @returns {Promise<object>} Promise.
*/
const removeReview = async (bookId, reviewId) => {
    const sql = `
    DELETE 
    FROM
        reviews
    WHERE 
        book_Id = ?
    AND 
        review_Id = ?
    `;

    return await pool.query(sql, [bookId, reviewId]);
};

/** 
* Creates a new rating record for a certain book  in the database. 
* @async
* @param {number} id - The book unique number.
* @param {number} id - The rating value.
* @param {number} id - The user unique number.
* @returns {Promise<object>} Promise.
*/
const insertRating = async (bookId, ratingId, userId) => {
    const sql = `
    INSERT INTO
        books_has_book_ratings (book_to_be_rated_Id, rating_Id, user_Id)
    VALUES
        (?, ?, ?)`;

    return await pool.query(sql, [bookId, ratingId, userId]);
};

/** 
* Updates a new rating record for a certain book in the database. 
* @async
* @param {number} id - The rating value.
* @param {number} id - The book unique number.
* @param {number} id - The user unique number.
* @returns {Promise<object>} Promise.
*/
const updateRating = async (ratingId, bookId, userId) => {
    const sql = `
    UPDATE 
    books_has_book_ratings
    SET 
    rating_Id = ?
    WHERE 
    book_to_be_rated_Id = ?
    AND 
    user_Id = ?
    `;

    return await pool.query(sql, [ratingId, bookId, userId]);
};

/** 
* Gets all rating values of a book in the database.
* @async
* @param {number} id - The book id to search by.
* @param {number} id - The user unique number.
* @returns {Promise<object>} Promise with the book rating data if found in the database.
*/
const getUserRatingsForBook = async (bookId, userId) => {
    const sql = `
    SELECT * 
    FROM 
        books_has_book_ratings
    WHERE 
        book_to_be_rated_Id = ?
    AND 
        user_Id = ?
    `;

    return await pool.query(sql, [bookId, userId]);
};

/** 
* Gets all book reviews, wrtiten by an user in the database.
* @async
* @param {number} id - The unique user number.
* @param {number} id - The unique book number.
* @returns {Promise<object>} Promise with the book reviws data if found in the database.
*/
const getUserReviews = async (userId, bookId) => {
    const sql = `
    SELECT * 
    FROM
        reviews WHERE user_Id = ? AND book_Id = ?`;

    return await pool.query(sql, [userId, bookId]);
};

/** 
* Gets a review from the database.
* @async
* @param {string} content - The review content value to search by. 
* @returns {Promise<object>} Promise with the review data if found in the database.
*/
const getReviewByContent = async (content, reviewId) => {
    const sql = 'SELECT * FROM reviews WHERE content LIKE ? AND review_Id = ?';

    return await pool.query(sql, [content, reviewId]);
};

/** 
* Gets all reviews likes, given by the users in the database.
* @async
* @param {number} id - The unique review number.
* @returns {Promise<object>} Promise with the reviws likes data if found in the database.
*/
const getReviewLikes = async (reviewId) => {
    const sql = `select COUNT(*) AS Likes 
    from reviews_have_votes WHERE review_id = ? AND vote_Id = 1`;

    const res = await pool.query(sql, [reviewId]);

    return res[0].Likes;
};

/** 
* Gets all reviews dislikes, given by the users in the database.
* @async
* @param {number} id - The unique review number.
* @returns {Promise<object>} Promise with the reviws dislikes data if found in the database.
*/
const getReviewDislikes = async (reviewId) => {
    const sql = `select COUNT(*) AS Dislikes
    from reviews_have_votes WHERE review_id = ? AND vote_Id = 2`;

    const res = await pool.query(sql, [reviewId]);

    return res[0].Dislikes;
};

/** 
* Creates a new book in the database. 
* @async
* @param {string} title - the title of the book
* @param {string} author - the author of the book
* @param {string} description - a short description of the book
* @returns {Promise<object>}
*/
const insertBook = async (title, author, description, genre, year, status, cover) => {
    const sql = `
        INSERT INTO
            books (title, author, description, genre, year, borrowedStatus_Id, imageUrl)
        VALUES 
            (?, ?, ?, ?, ?, (SELECT status_Id FROM status WHERE type = ?), ?);
        `;

    return await pool.query(sql, [title, author, description, genre, year, status, cover]);
};

/** 
* Finds and updates the params of a book in the database.
* @async
* @param {string} column - The column to be updated.
* @param {string} value - The value to be updated.
* @param {number} id - The book id to search for.
* @returns {Promise<object>} Promise with the book data if found in the database.
*/
const updateBookInfo = async (bookInfo) => {
    const { id, title, author, description, genre, status } = bookInfo;

    const sql = `
    UPDATE books 
    SET 
        title = ?,
        author = ?,
        description = ?,
        genre = ?,
        borrowedStatus_Id = (SELECT status_Id FROM status WHERE type = ?)
    WHERE
        book_Id = ?;
    `;
    return await pool.query(sql, [title, author, description, genre, status, id]);
};

/** 
* Removes a book from the database.
* @async
* @param {number} id - The book id to search for.
* @returns {Promise<object>} Promise.
*/
const removeBook = async (id) => {
    const sql = `
    DELETE 
    FROM
        books
    WHERE 
        book_Id = ?
    `;

    return await pool.query(sql, [id]);
};

/** 
* Finds a book in the database. 
* @async
* @param {string} title - The title of the searched book.
* @param {string} author - The author of the searched book.
* @returns {Promise<object>} Promise with the book data if found in the database.
*/
const findBook = async (title, author) => {
    const sql = `
        SELECT 
            * 
        FROM 
            books 
        WHERE 
            title 
        LIKE 
            ? 
        AND 
            author 
        LIKE 
            ?
    `;

    return await pool.query(sql, [title, author]);
};

/** 
* Creates a new record vote in the database. 
* @async
* @param {number} id - The unique review number.
* @param {number} id - The unique vote number.
* @param {number} id - The unique user number.
* @returns {Promise<object>} Promise.
*/
const insertVote = async (reviewId, vote, userId) => {
    const sql = `
    INSERT INTO
        reviews_have_votes (review_Id, vote_Id, user_Id)
    VALUES
        (?, (SELECT vote_Id FROM reviews_votes WHERE type_of_Vote LIKE ?), ?)`;

    return await pool.query(sql, [reviewId, vote, userId]);
};

/** 
* Finds and updates a record vote in the database. 
* @async
* @param {number} id - The unique vote number.
* @param {number} id - The unique review number.
* @param {number} id - The unique user number.
* @returns {Promise<object>} Promise.
*/
const updateVote = async (voteId, reviewId, userId) => {
    const sql = `
    UPDATE 
        reviews_have_votes
    SET 
        vote_Id = (SELECT vote_Id FROM reviews_votes WHERE type_of_vote LIKE ?)
    WHERE 
        review_Id = ?
    AND 
        user_Id = ?
    `;

    return await pool.query(sql, [voteId, reviewId, userId]);
};

/** 
* Gets a vote record  from the database found by unique review and user number.
* @async
* @param {number} id - The unique review number in the database to search by.
* @param {number} id - The unique user number in the database to search by.
* @returns {Promise<object>} Promise with the vote data if found in the database.
*/
const getUserVoteForBook = async (reviewId, userId) => {
    const sql = `
    SELECT 
        vote_Id 
    FROM 
        reviews_have_votes
    WHERE 
        review_Id = ?
    AND 
        user_Id = ?
    `;

    return await pool.query(sql, [reviewId, userId]);
};

export default {
    getReviews,
    getById,
    searchBy,
    pushReview,
    getBookBorrowerId,
    updateBookStatusToBorrowed,
    updateBookStatusToFree,
    sendBookIdToUserHistory,
    deleteReview,
    getReadHistory,
    getReview,
    updateReview,
    removeReview,
    insertRating,
    updateRating,
    getUserRatingsForBook,
    getUserReviews,
    getReviewByContent,
    getReviewVotes,
    getReviewLikes,
    getReviewDislikes,
    insertBook,
    findBook,
    updateBookInfo,
    removeBook,
    insertVote,
    updateVote,
    getUserVoteForBook,
    searchQuery,
    getAllBasicInfo,
    getPageResult,
    getReviewsInDatabase,
    borrowedByUser,
};