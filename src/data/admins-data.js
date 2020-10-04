import pool from './pool.js';

const insertBook = async (title, author, description) => {
    const sql = `
        INSERT INTO
            books (title, author, description)
        VALUES 
            (?, ?, ?)
        `;

    return await pool.query(sql, [title, author, description]);
};

const getAll = async () => {
    const sql = `
        SELECT 
            user_Id, username 
        FROM 
            users
    `;

    return await pool.query(sql);
};

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

const getBy = async (column, value) => {
    const sql = `
        SELECT user_Id, username
        FROM users
        WHERE ${column} = ?
    `;

    const result = await pool.query(sql, [value]);

    return result[0];
};

const remove = async (user) => {
    const sql = `
        DELETE FROM users 
        WHERE user_Id = ?
    `;

    return await pool.query(sql, [user.user_Id]);
};

const searchBy = async (column, value) => {
    const sql = `
        SELECT user_Id, username 
        FROM users
        WHERE ${column} LIKE '%${value}%' 
    `;

    return await pool.query(sql);
};

const getBook = async (id) => {
    const sql = `
        SELECT * 
        FROM books 
        WHERE book_Id = ?
    `;

    return await pool.query(sql, [id]);
};

const updateBookInfo = async (column, value, id) => {
    const sql = `
    UPDATE books 
    SET 
        ${column} = '${value}'
    WHERE
        book_Id = ${id};
    `;
    return await pool.query(sql);
};

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
};
