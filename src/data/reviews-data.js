import pool from './pool.js';

const getReviewById = async (value) => {
    const sql = `
        SELECT * 
        FROM reviews
           
        WHERE 
            review_Id = ?
        
        `;

    return await pool.query(sql, [value]);
};

const insertVote = async (reviewId, voteId, userId) => {
    const sql = `
    INSERT INTO
        reviews_have_votes (review_Id, vote_Id, user_Id)
    VALUES
        (?, ?, ?)`;

    return await pool.query(sql, [reviewId, voteId, userId]);
};

const updateVote = async (voteId, reviewId, userId) => {
    const sql = `
    UPDATE 
        reviews_have_votes
    SET 
        vote_Id = ?
    WHERE 
        review_Id = ?
    AND 
        user_Id = ?
    `;

    return await pool.query(sql, [voteId, reviewId, userId]);
};

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


export default{
    getReviewById,
    insertVote,
    updateVote,
    getUserVoteForBook,
    
};

