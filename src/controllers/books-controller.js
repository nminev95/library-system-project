import express from 'express';
import booksService from '../services/books-service.js';

const booksController = express.Router();

booksController
    .get('/', async (req, res) => {
        const { search } = req.query;
        const books = await booksService.getAllBooks(search);

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
        const reviews = await booksService.getBookReviews(+id); //

        res.status(200).json(reviews);
    })
    .post('/:id/reviews', async (req, res) => {
        const review = Object.values(req.body).join('');
        const id = req.params.id;
        
        const result = await booksService.createReview(review, id);

        res.status(201).json({ message: 'Review successfully submitted!' });
    })
    .put('/:id/reviews/:reviewId', async (req, res) => {
        const review = Object.values(req.body).join('');
        const id = req.params.id;

        const result = await booksService.updateBookReview(review, id);

        res.status(201).json({ message: 'Review successfully updated!'});
    })
    .delete('/:id/reviews/:reviewId', async (req, res) => {
        const id = req.params.reviewId;

        const result = await booksService.removeReview(id);

        res.status(200).json({ message: 'Review successfully deleted!'});
    });

export default booksController;
