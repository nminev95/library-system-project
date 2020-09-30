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

const getById = async (value) => {
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
        WHERE
            b.book_Id = ${value};
        `;

    return await pool.query(sql);
};

const getReviews = async (value) => {
    const sql = `
        SELECT 
            review_Id as review_id, 
            content as Review 
        from 
        Reviews WHERE book_Id = ${value}
        `;

    return await pool.query(sql);
};

const searchBy = async () => {

};

//Admin functionalities 
const create = async () => {

};

const update = async () => {

};

const remove = async () => {

};



export default {
    getAll,
    getReviews,
    searchBy,
    getById,
    create,
    update,
    remove,
};