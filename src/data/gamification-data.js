import pool from './pool.js';

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

export default {
    getPoints,
    addPoint,
    changeLevel,
    removePoints,
    decreaseLevel,
};