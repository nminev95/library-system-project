import pool from './pool.js';

const getAll = async () => {
    const sql = `
        SELECT
            b.book_Id AS id,
            b.title AS Title, 
            b.author AS Author, 
            b.description as 'Description', 
            group_concat('id:', r.review_Id,', ','review:',' ', r.content SEPARATOR '; ') as Reviews, 
            s.type as Status 
        from    
            books b
        left join 
            reviews r
        on 
            b.book_Id = r.book_Id
        join 
            status s
        on 
            s.status_Id = b.borrowedStatus_Id
        GROUP BY
            b.book_Id
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