import pool from './pool.js';

/** 
* Gets all users from the database. 
* @async
* @returns {Promise<object>} Promise with data from the database.
*/
const getAll = async () => {
    const sql = `
        SELECT 
            u.user_Id AS id, 
            u.username AS username, 
            u.email AS email, 
            l.type AS level,
            (SELECT DATE_FORMAT(u.register_date, "%M %d %Y")) AS registered
        FROM 
            users u
        JOIN    
            user_levels l
        ON 
            u.user_level = l.user_level_id
    `;

    return await pool.query(sql);
};

/** 
* Finds a user in the database by username. 
* @async
* @param {string} username - The username of the  searched user.
* @returns {Promise<object>} Promise with the user data if found in the database.
*/
const getWithRole = async (username) => {
    const sql = `
    SELECT u.user_Id, u.username, u.password, u.email, u.user_points, u.user_level, u.register_date, r.type_of_user as role, b.isBanned, b.expirationDate
    FROM users u
    JOIN roles r 
    ON u.role_id = r.role_id
    left join ban_status b
    ON b.user_Id = u.user_Id
    WHERE u.username = ?
    `;

    const result = await pool.query(sql, [username]);

    return result[0];
};

/** 
* Creates a new user in the database. 
* @async
* @param {string} username - The unique username of the new user.
* @param {string} password - The user pasword.
* @param {string} email - The user email.
* @param {number} id - The unique role number of the created user.
* @returns {Promise<object>} Promise.
*/
const create = async (username, password, email, role) => {
    const sql = `
        INSERT INTO 
            users (username, password, email, role_id, register_date)
        VALUES 
            (?,?,?, (SELECT role_id FROM roles WHERE type_of_user = ?), (SELECT NOW()));
    `;

    const result = await pool.query(sql, [username, password, email, role]);


    return {
        id: result.insertId,
        username: username,
    };
};

/**
* Finds record and update user's username. 
* @async
* @param {string} username - The unique username of the new user.
* @param {number} id - The unique role number of the created user.
* @returns {Promise<object>} Promise.
*/
const update = async (user) => {
    const { id, username, email } = user;
    const sql = `
        UPDATE users SET
          username = ?,
          email = ?
        WHERE user_Id = ?
    `;

    return await pool.query(sql, [username, email, id]);
};

const updatePass = async (newPassword, id) => {
    const sql = `
        UPDATE users SET
          password = ?
        WHERE user_Id = ?
    `;

    return await pool.query(sql, [newPassword, id]);
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
        SELECT 
            u.user_Id AS Id, 
            u.username AS Username, 
            u.password AS Password,
            u.email AS Email, 
            u.user_points AS Points, 
            l.type AS Level,
            (SELECT DATE_FORMAT(u.register_date, "%M %d %Y")) AS Joined
        FROM 
            users u
        JOIN    
            user_levels l
        ON 
            u.user_level = l.user_level_id
        WHERE ${column} LIKE '%${value}%' 
    `;

    return await pool.query(sql);
};


/** 
* Removes an user from the database.
* @async
* @param {number} id - The user id to search for.
* @returns {Promise<object>} Promise.
*/
const removeUser = async (user) => {
    const sql = `
        DELETE FROM users 
        WHERE user_Id = ?
    `;

    return await pool.query(sql, [user]);
};

/** 
* Gets user ban status info from the database. 
* @async
* @param {number} id - The unique number of the banned user.
* @returns {Promise<object>} Promise with the banned user data if found in the database.
*/
const getBanStatus = async (id) => {
    const sql = `
    SELECT * FROM ban_status WHERE user_Id = ?;
    `;

    const ban = await pool.query(sql, [id]);
    return ban[0];
};

/** 
* Creates a record for a banned user in the database.
* @async
* @param {string} description - A short description of a ban reasons.
* @param {number} expiration date - The date of ban expiration.
* @param {number} id - The unique number of banned user.
* @returns {Promise<object>} Promise.
**/
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

const getExpDate = async (id) => {
    const sql = 'SELECT DATEDIFF((SELECT expirationDate FROM ban_status WHERE user_Id = ?), (SELECT NOW())) as dateDiff';

    const res = await pool.query(sql, [id]);

    return res[0];
};

/** 
* Finds and removes a record for a banned user from the database.
* @async
* @param {number} id - The unique ban number.
* @returns {Promise<object>} Promise.
**/
const deleteBan = async (banStatusId) => {
    const sql = 'DELETE FROM ban_status WHERE idban_status = ?';

    return await pool.query(sql, [banStatusId]);
};

export default {
    getAll,
    create,
    update,
    getWithRole,
    searchBy,
    removeUser,
    getBanStatus,
    sendBannedUserData,
    getExpDate,
    deleteBan,
    updatePass
};
