import pool from './pool.js';

/** 
* Gets review info from the database found by unique review number.
* @async
* @param {number} id - The unique review number in the database to search by.
* @returns {Promise<object>} Promise with review data if found in the database.
*/
const getReviewById = async (value) => {
    const sql = `
        SELECT * 
        FROM reviews
           
        WHERE 
            review_Id = ?
        
        `;

    return await pool.query(sql, [value]);
};

/** 
* Creates a new record vote in the database. 
* @async
* @param {number} id - The unique review number.
* @param {number} id - The unique vote number.
* @param {number} id - The unique user number.
* @returns {Promise<object>} Promise.
*/
const insertVote = async (reviewId, voteId, userId) => {
    const sql = `
    INSERT INTO
        reviews_have_votes (review_Id, vote_Id, user_Id)
    VALUES
        (?, ?, ?)`;

    return await pool.query(sql, [reviewId, voteId, userId]);
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
        vote_Id = ?
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


export default{
    getReviewById,
    insertVote,
    updateVote,
    getUserVoteForBook,
    
};

