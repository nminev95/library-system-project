import booksData from '../data/books-data.js';

const getAllBooks = async (filter) => {
    return filter
    ? await booksData.searchBy('title', filter)
    : await booksData.getAll();
};

const getBookById = async (id) => await booksData.getById('id', id);

const getBookReviews =  async (id) => {
    return await booksData.getReviews(id);
};

const createReview = async (content, id) => {
    return await booksData.pushReview(content, id);
};

const updateBookStatus = async (id) => {
return await booksData.updateBook(id);
  
    
  };

export default {
    getAllBooks,
    getBookById,
    getBookReviews,
    createReview,
    updateBookStatus,
};
