import pool from './pool.js';

/** 
* Gets all books from the database. 
* @async
* @returns {Promise<object>} Promise with data from the database.
*/
const getAll = async () => {
    const sql = `
    SELECT
            b.book_Id AS id,
            b.title AS Title, 
            b.author AS Author, 
            b.description as 'Description',
            s.type as Status,
            r.review_Id as Review_Id,
            r.content as Review,
            AVG(rr.rating_value) as Rating
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
        GROUP BY 
            IFNULL(r.review_Id, b.description);
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
            s.type as Status,
            r.review_Id as Review_Id,
            r.content as Review,
            AVG(rr.rating_value) as Rating
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
            IFNULL(r.content, b.book_Id);
        `;

    return await pool.query(sql, [value]);
};

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
* Gets all book's reviews info from the database found by unique book number.
* @async
* @param {number} id - The book's id in the database to search by.
* @returns {Promise<object>} Promise with the book's reviews data if found in the database.
*/
const getReviews = async (value) => {
    const sql = `
        SELECT 
            review_Id as review_id, 
            content as Review 
        from 
            Reviews 
        WHERE 
            book_Id = ?;
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
            AVG(rr.rating_value) as Rating
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
            IFNULL(r.content, b.book_Id);
        `;


    return await pool.query(sql);

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
            reviews(content, isDeleted, book_Id, user_Id) 
        VALUES
            (?, '0', ?, ?)`;

    return await pool.query(sql, [content, id, userId]);
};

/** 
* Updates the book status to "Borrowed" when an user borrows it.  
* @async
* @param {number}  id - The uniique user number. 
* @param {number}  id - The unique book number.
* @returns {Promise<object>}
*/
const updateBookStatusToBorrowed = async (user_id, book_id) => {
    const sql = `
        UPDATE books SET
          borrowedStatus_Id = ?,
          borrower_Id = ?
        WHERE book_Id = ?
    `;
    return await pool.query(sql, [4, user_id, book_id]);
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
          borrowedStatus_Id = '6',
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
const getReviewByContent = async (content) => {
    const sql = 'SELECT * FROM reviews WHERE content LIKE ?';

    return await pool.query(sql, [content]);
};

/** 
* Gets all user points from the database.
* @async
* @param {number} id - The unique user number to search by. 
* @returns {Promise<object>} Promise with the points data if found in the database.
*/
const getPoints = async (userId) => {
    const sql = 'SELECT user_points from users WHERE user_Id = ?';

    return await pool.query(sql, [userId]);
};

/** 
* Finds and adds  points to user point field in the database.
* @async
* @param {number} id - The unique user number to search by. 
* @returns {Promise<object>} Promise.
*/
const addPoint = async (userId) => {
    const sql = 'UPDATE users SET user_points = user_points + 1 WHERE user_Id = ?';

    return await pool.query(sql, [userId]);
};

/** 
* Finds and removes points from user point field in the database.
* @async
* @param {number} id - The unique user number to search by. 
* @param {number} points - The amounth of points to be added to the  user field.
* @returns {Promise<object>} Promise.
*/
const removePoints = async (userId, points) => {
    const sql = `UPDATE users SET user_points = user_points - ${points} WHERE user_Id = ?`;

    return await pool.query(sql, [userId]);
};

/** 
* Increases user level in the database.
* @async
* @param {number} id - The unique user number to search by. 
* @returns {Promise<object>} Promise.
*/
const changeLevel = async (userId) => {
    const sql = 'UPDATE users SET user_level = user_level + 1 WHERE user_Id = ?';

    return await pool.query(sql, [userId]);
};

/** 
* Decreases user level in the database.
* @async
* @param {number} level id - The unique level number. 
* @param {number} id - The unique user number to search by. 
* @returns {Promise<object>} Promise.
*/
const decreaseLevel = async (value, userId) => {
    const sql = 'UPDATE users SET user_level = ? WHERE user_Id = ?';

    return await pool.query(sql, [value, userId]);
};

const getReviewLikes = async (reviewId) => {
    const sql = `select COUNT(*) AS Likes 
    from reviews_have_votes WHERE review_id = ? AND vote_Id = 1`;

    const res = await pool.query(sql, [reviewId]);
    
    return res[0].Likes;
};

const getReviewDislikes = async (reviewId) => {
    const sql = `select COUNT(*) AS Dislikes
    from reviews_have_votes WHERE review_id = ? AND vote_Id = 2`;

    const res = await pool.query(sql, [reviewId]);

    return res[0].Dislikes;
};

export default {
    getAll,
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
    getPoints,
    addPoint,
    changeLevel,
    removePoints,
    decreaseLevel,
    getReviewVotes,
    getReviewLikes,
    getReviewDislikes,
};