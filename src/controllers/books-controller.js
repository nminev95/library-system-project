import express from 'express';
import bookData from '../data/books-data.js';

const booksController = express.Router();

booksController
    .get('/', async (req, res) => {
        const books = await bookData.getAllBooks();

        res.status(200).json(books);
    })
    .get('/:id', async (req, res) => {
        const { id } = req.params;
        const book = await bookData.getById(+id);
        
        res.status(200).json(book);
    })
    .get('/:id/reviews', async (req, res) => {
        const { id } = req.params;
        const reviews = await bookData.getBookReviews(+id);

        res.status(200).json(reviews);
    })
    .put(() => {

    })

    .post(() => {

    })

    .delete(() => {

    });

export default booksController;