import pool from './pool.js';

/** 
* Creates a new book in the database. 
* @async
* @param {string} title - the title of the book
* @param {string} author - the author of the book
* @param {string} description - a short description of the book
* @returns {Promise<object>}
*/
const insertBook = async (title, author, description, status) => {
    const sql = `
        INSERT INTO
            books (title, author, description, borrowedStatus_Id)
        VALUES 
            (?, ?, ?, ?)
        `;

    return await pool.query(sql, [title, author, description, status]);
};

/** 
* Gets all books from the database. 
* @async
* @returns {Promise<object>} Promise with data from the database.
*/
const getAll = async () => {
    const sql = `
        SELECT 
            user_Id, username 
        FROM 
            users
    `;

    return await pool.query(sql);
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
* Gets user info from the database. 
* @async
* @param {string} column - The column in the database to search in.
* @param {any} value - The value to search for in the column.
* @returns {Promise<object>} Promise with the user data if found in the database.
*/
const getBy = async (column, value) => {
    const sql = `
        SELECT user_Id, username
        FROM users
        WHERE ${column} = ?
    `;

    const result = await pool.query(sql, [value]);

    return result[0];
};

/** 
* Removes an user from the database.
* @async
* @param {number} id - The user id to search for.
* @returns {Promise<object>} Promise.
*/
const remove = async (user) => {
    const sql = `
        DELETE FROM users 
        WHERE user_Id = ?
    `;

    return await pool.query(sql, [user.user_Id]);
};

/** 
* Gets user info from the database. 
* @async
* @param {string} column - The column in the database to search in.
* @param {any} value - The value to search for in the column.
* @returns {Promise<object>} Promise with the user data if found in the database.
*/
const searchBy = async (column, value) => {
    const sql = `
        SELECT user_Id, username 
        FROM users
        WHERE ${column} LIKE '%${value}%' 
    `;

    return await pool.query(sql);
};

/** 
* Finds a book in the database by id. 
* @async
* @param {number} id - The id of the searched book.
* @returns {Promise<object>} Promise with the book data if found in the database.
*/
const getBook = async (id) => {
    const sql = `
        SELECT * 
        FROM books 
        WHERE book_Id = ?
    `;

    return await pool.query(sql, [id]);
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
    const { book_Id, title, author, description } = bookInfo;
    const sql = `
    UPDATE books 
    SET 
        title = ?,
        author = ?,
        description = ?
    WHERE
        book_Id = ?;
    `;
    return await pool.query(sql, [title, author, description, book_Id]);
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
* Gets the reviews for a certain book if any.
* @async
* @param {number} bookId - The book id to search for.
* @param {number} reviewId - The review id to search for.
* @returns {Promise<object>} Promise with the review data if found in the database.
*/
const checkBookForReview = async (bookId, reviewId) => {
    const sql = `
    SELECT 
        * 
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
* Deletes a review for a certain book from the database.
* @async
* @param {number} bookId - The book id to search for.
* @param {number} reviewId - The review id to search for.
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
* Updates a review for a certain book from the database.
* @async
* @param {string} content - The new review content.
* @param {number} reviewId - The review id to search for.
* @returns {Promise<object>} Promise.
*/
const changeReview = async (content, reviewId) => {
    const sql = `
    UPDATE 
        reviews
    SET 
        content = ?
    WHERE
        review_Id = ?;
    `;

    return await pool.query(sql, [content, reviewId]);
};

/** 
* Adds a review for a certain book from the database.
* @async
* @param {string} content - The new review content.
* @param {number} bookId - The book id to search for.
* @param {number} user_Id - The id of the author(admin).
* @returns {Promise<object>} Promise.
*/
const insertReview = async (content, bookId, user_Id) => {
    const sql = `
        INSERT INTO
            reviews 
            (content, book_Id, user_Id)
        VALUES 
            (?, ?, ?)
    `;

    return await pool.query(sql, [content, bookId, user_Id]);
};

const sendBannedUserData = async (description, expirationDate, userId) => {
    const sql = `
        INSERT INTO
            ban_status 
            (description, expirationDate, user_Id)
        VALUES 
            (?, ?, ?)
    `;

    return await pool.query(sql, [description, expirationDate, userId]);
};

const getBanStatus = async (id) => {
    const sql = `
    SELECT * FROM ban_status WHERE user_Id = ?;
    `;

    const ban = await pool.query(sql, [id]);
    return ban[0];
};


export default {
    getAll,
    getBy,
    remove,
    searchBy,
    insertBook,
    findBook,
    getBook,
    updateBookInfo,
    removeBook,
    checkBookForReview,
    removeReview,
    changeReview,
    insertReview,
    sendBannedUserData,
    getBanStatus,
};
