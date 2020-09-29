import express from 'express';
import bookData from '../data/books-data.js';

const booksController = express.Router();

booksController
    .get('/', async (req, res) => {
        const books = await bookData.getAll();

        res.status(200).send(books);
    })

    .get(() => {

    })

    .put(() => {

    })

    .post(() => {

    })

    .delete(() => {

    });

export default booksController;