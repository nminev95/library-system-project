import pool from './pool.js';

const getAllBooks = async () => {
    const sql = `
        SELECT 
	        b.books_Id as Id,
    	    b.title As Title,
    	    b.author AS Author,
            b.description AS Description,
            b.isBorrowed AS isBorrowed,
        GROUP_CONCAT('id:', r.review_Id,', ','review:',' ', r.content SEPARATOR '; ') AS Reviews
	    FROM 
            books b,
            reviews r
        WHERE
            b.books_Id = r.book_Id;
        `;

    return await pool.query(sql);
};

export default {
    getAllBooks,
};