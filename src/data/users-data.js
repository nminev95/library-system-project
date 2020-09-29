import pool from './pool.js';

const getAll = async () => {

};

const checkForUsername = async (username) => {
    const sql = `
    SELECT * FROM users 
    WHERE username = '${username}'`;

    return await pool.query(sql);
};

const create = async () => {

};

const update = async () => {

};

const remove = async () => {

};

export default {
    getAll,
    checkForUsername,
    create,
    update,
    remove,
};