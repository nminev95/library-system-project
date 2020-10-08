import pool from './pool.js';

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

export default {
    getPoints,
    addPoint,
    changeLevel,
    removePoints,
    decreaseLevel,
};