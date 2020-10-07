import pool from './pool.js';


/** 
* Finds a user in the database by username. 
* @async
* @param {string} username - The username of the  searched user.
* @returns {Promise<object>} Promise with the user data if found in the database.
*/
const getWithRole = async (username) => {
    const sql = `
        SELECT u.user_Id, u.username, u.password, r.type_of_user as role
        FROM users u
        JOIN roles r 
        WHERE u.username = ?
        AND u.role_id = r.role_id
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
    const { user_Id, username } = user;
    const sql = `
        UPDATE users SET
          username = ?
        WHERE user_Id = ?
    `;

    return await pool.query(sql, [username, user_Id]);
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

export default {
    create,
    update,
    getWithRole,
    getBy,
};
