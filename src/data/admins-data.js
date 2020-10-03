import pool from './pool.js';

// const createBook = async () => {
//     const sql = `
//         INSERT INTO
//             user_history (book_id)
//         VALUES 
//             (?)
//         `;
// };

const getAll = async () => {
    const sql = `
        SELECT user_Id, username 
        FROM users
    `;

    return await pool.query(sql);
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

const remove = async (user) => {
    const sql = `
        DELETE FROM users 
        WHERE user_Id = ?
    `;

    return await pool.query(sql, [user.user_Id]);
};

const searchBy = async (column, value) => {
    const sql = `
        SELECT user_Id, username 
        FROM users
        WHERE ${column} LIKE '%${value}%' 
    `;

    return await pool.query(sql);
};

export default {
    getAll,
    getBy,
    remove,
    searchBy,
};
