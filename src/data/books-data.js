import pool from './pool.js';

const getAll = async () => {
    const sql = `
        SELECT
            b.book_Id AS id,
            b.title AS Title, 
            b.author AS Author, 
            b.description as 'Description',
            s.type as Status,
            r.review_Id as Review_Id,
            r.content as Review
        from 
            books b
        left join 
            reviews r
        on 
            b.book_Id = r.book_Id
        join 
            status s
        on 
            s.status_Id = b.borrowedStatus_Id;
        `;

    return await pool.query(sql);
};

const getById = async (column, value) => {
    const sql = `
        SELECT
            b.book_Id AS id,
            b.title AS Title, 
            b.author AS Author, 
            b.description as 'Description',
            s.type as Status,
            r.review_Id as Review_Id,
            r.content as Review
        from 
            books b
        left join 
            reviews r
        on 
            b.book_Id = r.book_Id
        join 
            status s
        on 
            s.status_Id = b.borrowedStatus_Id
        WHERE 
            b.book_Id = ${value};
        `;

    return await pool.query(sql);

};

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

const searchBy = async (column, value) => {
    const sql = `
        SELECT
            b.book_Id AS id,
            b.title AS Title, 
            b.author AS Author, 
            b.description as 'Description',
            s.type as Status,
            r.review_Id as Review_Id,
            r.content as Review
        from 
            books b
        left join 
            reviews r
        on 
            b.book_Id = r.book_Id
        join 
            status s
        on 
            status_Id = b.borrowedStatus_Id
        WHERE 
            ${column} 
        LIKE 
            '%${value}%';
        `;

    return await pool.query(sql);

};

const pushReview = async (content, id) => {
    const sql = `
        INSERT INTO
            reviews(content, isDeleted, book_Id, user_Id) 
        VALUES
            (?, '0', ?, 1)`;

    return await pool.query(sql, [content, id]);
};
const updateBookStatusToBorrowed = async (id, username) => {
    const sql = `
        UPDATE books SET
          borrowedStatus_Id = ?,
          borrower_Id = ?
        WHERE book_Id = ?
    `;
    return await pool.query(sql, [1, username, id]);
};

const updateBookStatusToFree = async (id) => {
    const sql = `
        UPDATE books SET
          borrowedStatus_Id = ?,
          borrower_Id = ?
        WHERE book_Id = ?
    `;
    return await pool.query(sql, [3, 0, id]);
};

const saveBookIdToUserHistory = async (id) => {
    const sql = `
       INSERT INTO
          user_history (book_id)
       VALUES 
        (?)`;

    return await pool.query(sql[id]);
};


const updateReview = async (content, id) => {
    const sql = `
        UPDATE reviews SET
            content = ? 
        WHERE 
            review_Id = ?
        `;

    return await pool.query(sql, [content, id]);
};



const deleteReview = async (id) => {
    const sql = `
        UPDATE reviews SET
            isDeleted = ? 
        WHERE 
            review_Id = ?
        `;

    return await pool.query(sql, [1, id]);
};

export default {
    getAll,
    getReviews,
    getById,
    searchBy,
    pushReview,
    updateBookStatusToBorrowed,
    updateBookStatusToFree,
    saveBookIdToUserHistory,
    updateReview,
    deleteReview,
};