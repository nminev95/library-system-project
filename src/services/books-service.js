import booksData from '../data/books-data.js';

const getAllBooks = async () => {
     await booksData.getAll();
};

const getBookById = async (id) => await booksData.getById('id', id);

const getBookReviews =  async() => {
    await booksData.getReviews();
};


//Admin functionalities
const createBook = async () => {

};

const deleteBook = async () => {

};

const updateBook = async () => {

};

export default {
    getAllBooks,
    getBookById,
    getBookReviews,
    createBook,
    deleteBook,
    updateBook,
};
