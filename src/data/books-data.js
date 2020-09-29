import pool from './pool.js';

const getAll = async () => {
    const sql = `
            SELECT 
                b.books_Id as Id,
                b.title As Title,
                b.author AS Author,
                b.description AS Description,
            GROUP_CONCAT('id:', r.review_Id,', ','review:',' ', r.content SEPARATOR '; ') AS Reviews,
            s.type As Status
            FROM 
                books b,
                reviews r,
                status s
            WHERE
                b.books_Id = r.book_Id;
            `;

    return await pool.query(sql);
};


const getBy = async () => {

};

const searchBy = async () => {

};
const create = async () => {

};

const update = async () => {

};

const remove = async () => {

};



export default {
    getAll,
    searchBy,
    getBy,
    create,
    update,
    remove,
};