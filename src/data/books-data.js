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
            IFNULL(r.content, b.book_Id);
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

const pushReview = async (content, id) => {
    const sql = `
        INSERT INTO
            reviews(content, isDeleted, book_Id, user_Id) 
        VALUES
            (?, '0', ?, 1)`;

    return await pool.query(sql, [content, id]);
};

const updateBookStatusToBorrowed = async (user_id, book_id) => {
    const sql = `
        UPDATE books SET
          borrowedStatus_Id = ?,
          borrower_Id = ?
        WHERE book_Id = ?
    `;
    return await pool.query(sql, [4, user_id, book_id]);
};

const updateBookStatusToFree = async (book_id) => {
    const sql = `
        UPDATE books SET
          borrowedStatus_Id = '6',
          borrower_Id = '0'
        WHERE book_Id = ?
    `;
    return await pool.query(sql, [book_id]);
};

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



const sendBookIdToUserHistory = async (userId, bookId) => {
    const sql = `
        INSERT INTO 
            users_history (user_Id, book_Id)
        VALUES 
            (?,?)`;

    return await pool.query(sql, [userId, bookId]);
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

const getReadHistory = async (id) => {
    const sql = `
    SELECT 
    user_Id, username, user_history 
    FROM users 
    WHERE user_Id = ?
    `;

    return await pool.query(sql, [id]);
};

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


const updateReview = async (content, id) => {
    const sql = `
        UPDATE reviews SET
            content = ? 
        WHERE 
            review_Id = ?
        `;

    return await pool.query(sql, [content, id]);
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

const insertRating = async (bookId, ratingId) => {
    const sql = `
    INSERT INTO
        books_has_book_ratings (book_to_be_rated_Id, rating_Id)
    VALUES
        (?, ?)`;

    return await pool.query(sql, [bookId, ratingId]);
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
};