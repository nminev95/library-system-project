import express from 'express';
import booksService from '../services/books-service.js';

const booksController = express.Router();

booksController
    .get('/', async (req, res) => {
        const books = await booksService.getAllBooks();

        res.status(200).json(books);
    })
    .get('/:id', async (req, res) => {
        const { id } = req.params;
        const book = await booksService.getBookById(+id);

        if (!book) {
            return res.status(404).send({
                message: 'The book is not found!',
            });
        }
        res.status(200).json(book);
    })
    .get('/:id/reviews', async (req, res) => {
        const { id } = req.params;
        const reviews = await booksService.getReviews(+id); //

        res.status(200).json(reviews);
    })
    .put(() => {

    })

    .post(() => {

    })

    .delete(() => {

    });

export default booksController;