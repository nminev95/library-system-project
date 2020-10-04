import pool from './pool.js';

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

const create = async (username, password,email, role) => {
    const sql = `
        INSERT INTO 
            users (username, password, email, role_id)
        VALUES 
            (?,?,?, (SELECT role_id FROM roles WHERE type_of_user = ?))
    `; 

    const result = await pool.query(sql, [username, password, email, role]);
    console.log(result);

    return {
        id: result.insertId,
        username: username,
    };
};

const update = async (user) => {
    const { user_Id, username } = user;
    const sql = `
        UPDATE users SET
          username = ?
        WHERE user_Id = ?
    `;

    return await pool.query(sql, [username, user_Id]);
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

export default {
    create,
    update,
    getWithRole,
    getBy,
};
