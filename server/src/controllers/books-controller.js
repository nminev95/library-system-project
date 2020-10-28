/* eslint-disable no-unused-vars */
import express from 'express';
import booksData from '../data/books-data.js';
import booksService from '../services/books-service.js';
import serviceErrors from '../services/service-errors.js';
import { authMiddleware, roleMiddleware } from '../auth/auth-middleware.js';
import { validateBanStatusMiddleware, createValidator, createReviewSchema, updateReviewSchema } from '../validations/index_2.js';
import gamificationService from '../services/gamification-service.js';
import gamificationData from '../data/gamification-data.js';

const booksController = express.Router();

booksController
    //get all books
    .get('/',
        // authMiddleware,
        // roleMiddleware(['admin', 'user']),
        async (req, res) => {
            const { error, books } = await booksService.getAllBooks(booksData)(req.query);

            if (error === serviceErrors.RECORD_NOT_FOUND) {
                res.status(404).send({ message: 'No books found!' });
            } else {
                res.status(200).send(books);
            }
        })

    .get('/user/books',
        authMiddleware,
        roleMiddleware(['admin', 'user']),
        async (req, res) => {
            const user_Id = req.user.id;
            const { error, books } = await booksService.getBorrowedBooks(booksData)(user_Id);

            if (error === serviceErrors.RECORD_NOT_FOUND) {
                res.status(404).send({ message: 'No books found!' });
            } else {
                res.status(200).send(books);
            }
        })
    .get('/pages/:id',
        // authMiddleware,
        // roleMiddleware(['admin', 'user']),
        async (req, res) => {
            const page = req.params.id;
           
            const { error, books } = await booksService.getAllBooks(booksData)(req.query, +page);

            if (error === serviceErrors.RECORD_NOT_FOUND) {
                res.status(404).send({ message: 'Such page does not exist!' });
            } else {
                res.status(200).send(books);
            }
        })
    //get a book by id
    .get('/:id',
        // authMiddleware,
        // roleMiddleware(['admin', 'user']),
        // validateBanStatusMiddleware(),
        async (req, res) => {
            const { id } = req.params;
            const { error, book } = await booksService.getBookById(booksData)(+id);

            if (error === serviceErrors.RECORD_NOT_FOUND) {
                res.status(404).send({ message: 'Book not found!' });
            } else if (error === serviceErrors.NOT_A_NUMBER) {
                res.status(404).send({ message: 'Id must be a valid positive integer!' });
            } else {
                res.status(200).send(book);
            }
        })
    //get all the reviews of a book 
    .get('/:id/reviews',
        authMiddleware,
        roleMiddleware(['admin', 'user']),
        async (req, res) => {
            const { id } = req.params;
            const { error, reviews } = await booksService.getBookReviews(booksData)(+id);

            if (error === serviceErrors.RECORD_NOT_FOUND) {
                res.status(404).send({ message: 'Book not found or doesn\'t have reviews yet!' });
            } else {
                res.status(200).send(reviews);
            }
        })
    //post a review
    // eslint-disable-next-line no-unused-vars
    .post('/:id/reviews',
        authMiddleware,
        roleMiddleware(['user', 'admin']),
        validateBanStatusMiddleware(),
        createValidator(createReviewSchema),
        async (req, res) => {
            const { id } = req.params;
            const { content } = req.body;      
            const userId = req.user.id;      
            const role = req.user.role;

            const { error, reviews } = await booksService.createReview(booksData)(+id, +userId, content, role);

            if (error === serviceErrors.RECORD_NOT_FOUND) {
                res.status(404).send({ message: 'Book not found!' });
            } else if (error === serviceErrors.DUPLICATE_RECORD) {
                res.status(400).send({ message: 'You may review each book only once!' });
            } else {
                const _ = await gamificationService.addUserPoints(gamificationData)(userId);
                res.status(200).send(reviews);
            }
        })
    .put('/:id/reviews/:id',
        authMiddleware,
        roleMiddleware(['user']),
        validateBanStatusMiddleware(),
        createValidator(updateReviewSchema),
        async (req, res) => {
            const { content } = req.body;
            const { id } = req.params;          
            const userId = req.user.id;       
            const role = req.user.role;
            const { error, review } = await booksService.updateReview(booksData)(+id, content, +userId, role);

            if (error === serviceErrors.RECORD_NOT_FOUND) {
                return res.status(404).send({ message: 'Book/review not found!' });
            } else if (error === serviceErrors.OPERATION_NOT_PERMITTED) {
                return res.status(404).send({ message: 'Users can update only their own reviews!' });
            } else if (error === serviceErrors.DUPLICATE_RECORD) {
                return res.status(400).send({ message: 'Your new review should be different from the old one!' });
            } else {
                res.status(200).send(review);
            }
        })
    .delete('/:id/reviews/:id',
        authMiddleware,
        roleMiddleware(['user']),
        validateBanStatusMiddleware(),
        async (req, res) => {
            const url = req.originalUrl;
            const userId = req.user.id;
            const role = req.user.role;

            const { error, review } = await booksService.deleteReview(booksData)(url, +userId, role);

            if (error === serviceErrors.RECORD_NOT_FOUND) {
                return res.status(409).send({ message: 'Book/review not found!' });
            }
            if (error === serviceErrors.OPERATION_NOT_PERMITTED) {
                return res.status(404).send({ message: 'Users can delete only their own reviews!' });
            }
            res.status(201).send(review);

        })
    .put('/:id/rate',
        authMiddleware,
        roleMiddleware(['admin', 'user']),
        validateBanStatusMiddleware(),
        async (req, res) => {
            const bookId = req.params.id;
            const rating = req.body.rating;
            const userId = req.user.id;

            const { error, rate } = await booksService.rateBook(booksData)(+bookId, +userId, +rating);

            if (error === serviceErrors.RECORD_NOT_FOUND) {
                res.status(409).send({ message: 'Book not found!' });
            } else if (error === serviceErrors.NOT_A_NUMBER) {
                res.status(404).send({ message: 'Rating should be a valid integer in range [1-5]!' });
            } else if (error === serviceErrors.OPERATION_NOT_PERMITTED) {
                res.status(404).send({ message: 'Users can only rate book they have borrowed and returned!' });
            } else if (error === serviceErrors.DUPLICATE_RECORD) {
                res.status(400).send({ message: 'You have already rated this book! You can update your rating if you have changed your mind!' });
            } else {
                res.status(201).send(rate);
            }
        })
    //borrow a book
    .put('/:id',
        authMiddleware,
        roleMiddleware(['admin', 'user']),
        validateBanStatusMiddleware(),
        async (req, res) => {
            const id = req.params.id;
            const user_Id = req.user.id;

            const { error } = await booksService.borrowABook(booksData)(+user_Id, +id);

            if (error === serviceErrors.RECORD_NOT_FOUND) {
                res.status(404).send({ message: 'Book not found!' });
            } else if (error === serviceErrors.OPERATION_NOT_PERMITTED) {
                res.status(404).send({ message: 'The book is already borrowed or unavailable!' });
            } else {
                res.status(200).send({ message: 'You have borrowed the book successfully!' });
            }
        })
    //return a book 
    .post('/:id',
        authMiddleware,
        roleMiddleware(['admin', 'user']),
        validateBanStatusMiddleware(),
        async (req, res) => {
            const id = req.params.id;
            const user_Id = req.user.id;
            console.log(id, user_Id);

            const { error } = await booksService.returnABook(booksData)(+id, +user_Id);

            if (error === serviceErrors.RECORD_NOT_FOUND) {
                res.status(404).send({ message: 'Book not found!' });
            } else if (error === serviceErrors.OPERATION_NOT_PERMITTED) {
                res.status(400).send({ message: 'Book was either borrowed by another user or is not borrowed at all!!' });
            } else {
                const _ = await gamificationService.addUserPoints(gamificationData)(user_Id);
                res.status(200).send({ message: 'You have returned the book successfully!' });
            }
        });

export default booksController;
