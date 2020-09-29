import express from 'express';
import bookService from '../data/books-data.js';

const booksController = express.Router();

booksController
    .get('/', async (req, res) => {
        const books = await bookService.getAllBooks();

        res.status(200).send(books);
    });

export default booksController;