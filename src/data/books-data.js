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
            IFNULL(r.review_Id, b.description);
        `;

    return await pool.query(sql);
};

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

const pushReview = async (content, id, userId) => {
    const sql = `
        INSERT INTO
            reviews(content, isDeleted, book_Id, user_Id) 
        VALUES
            (?, '0', ?, ?)`;

    return await pool.query(sql, [content, id, userId]);
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
    *
    FROM users_history
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

const insertRating = async (bookId, ratingId, userId) => {
    const sql = `
    INSERT INTO
        books_has_book_ratings (book_to_be_rated_Id, rating_Id, user_Id)
    VALUES
        (?, ?, ?)`;

    return await pool.query(sql, [bookId, ratingId, userId]);
};

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

const getUserReviews = async (userId, bookId) => {
    const sql = `
    SELECT * 
    FROM
        reviews WHERE user_Id = ? AND book_Id = ?`;

    return await pool.query(sql, [userId, bookId]);
};

const getReviewByContent = async (content) => {
    const sql = 'SELECT * FROM reviews WHERE content LIKE ?';

    return await pool.query(sql, [content]);
};

const getPoints = async (userId) => {
    const sql = 'SELECT user_points from users WHERE user_Id = ?';

    return await pool.query(sql, [userId]);
};

const addPoint = async (userId) => {
    const sql = 'UPDATE users SET user_points = user_points + 1 WHERE user_Id = ?';

    return await pool.query(sql, [userId]);
};

const removePoints = async (userId, points) => {
    const sql = `UPDATE users SET user_points = user_points - ${points} WHERE user_Id = ?`;

    return await pool.query(sql, [userId]);
};


const changeLevel = async (userId) => {
    const sql = 'UPDATE users SET user_level = user_level + 1 WHERE user_Id = ?';

    return await pool.query(sql, [userId]);
};

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