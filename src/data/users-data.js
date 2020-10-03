import pool from './pool.js';

const getAll = async () => {
    const sql = `
        SELECT user_Id, username 
        FROM users
    `;

    return await pool.query(sql);
};

const getWithRole = async (username) => {
    const sql = `
        SELECT u.user_Id, u.username, u.password, r.type_of_user as role
        FROM users u
        JOIN roles r 
        WHERE u.username = ?
    `;

    const result = await pool.query(sql, [username]);

    return result[0];
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

const searchBy = async (column, value) => {
    const sql = `
        SELECT user_Id, username 
        FROM users
        WHERE ${column} LIKE '%${value}%' 
    `;

    return await pool.query(sql);
};

const create = async (username, password,email, role) => {
    const sql = `
        INSERT INTO users(username, password, email, role_id)
        VALUES (?,?,?, (SELECT role_id FROM roles WHERE type_of_user = ?))
    `; 

    const result = await pool.query(sql, [username, password, email, role]);
    console.log(result);

    return {
        id: result.insertId,
        username: username,
    };
};

const update = async (user) => {
    const { id, username } = user;
    const sql = `
        UPDATE users SET
          username = ?
        WHERE user_Id = ?
    `;

    return await pool.query(sql, [username, id]);
};

const remove = async (user) => {
    const sql = `
        DELETE FROM users 
        WHERE user_Id = ?
    `;

    return await pool.query(sql, [user.id]);
};

export default {
    getAll,
    searchBy,
    getBy,
    create,
    update,
    remove,
    getWithRole,
};
