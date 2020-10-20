/* eslint-disable no-unused-vars */
import express from 'express';
import { authMiddleware, roleMiddleware } from '../auth/auth-middleware.js';
import serviceErrors from '../services/service-errors.js';
import booksService from '../services/books-service.js';
import usersData from '../data/users-data.js';
import booksData from '../data/books-data.js';
import gamificationService from '../services/gamification-service.js';
import gamificationData from '../data/gamification-data.js';
import { createValidator, banUserSchema, createBookSchema, updateBookSchema } from '../validations/index_2.js';
import usersService from '../services/users-service.js';

const adminsController = express.Router();

adminsController
    .get('/books',
        authMiddleware,
        roleMiddleware(['admin']),
        async (req, res) => {
            res.redirect('http://localhost:3000/books');
        })
    .get('/books/:id',
        authMiddleware,
        roleMiddleware(['admin']),
        async (req, res) => {
            const id = req.params.id;
            res.redirect(`http://localhost:3000/books/${+id}`);
        })
    .get('/books/pages/:id',
        authMiddleware,
        roleMiddleware(['admin']),
        async (req, res) => {
            const id = req.params.id;
            res.redirect(`http://localhost:3000/books/pages/${+id}`);
        })
    .get('/users',
        // authMiddleware,
        // roleMiddleware(['admin']),
        async (req, res) => {
            const { search } = req.query;
            const users = await usersService.getAllUsers(usersData)(search);

            res.status(200).send(users);
        })
    .get('/reviews',
        // authMiddleware,
        // roleMiddleware(['admin']),
        async (req, res) => {
            const { search } = req.query;
            const { reviews } = await booksService.getAllReviews(booksData)(search);

            res.status(200).send(reviews);
        })

    .get('/users/:id',
        authMiddleware,
        roleMiddleware(['admin']),
        async (req, res) => {
            const { id } = req.params;

            const { error, user } = await usersService.getUserById(usersData)(+id);

            if (error === serviceErrors.RECORD_NOT_FOUND) {
                res.status(404).send({ message: 'User not found!' });
            } else {
                res.status(200).send(user);
            }
        })
    .delete('/users/:id',
        // authMiddleware,
        // roleMiddleware(['admin']),
        async (req, res) => {
            const { id } = req.params;

            const { error, user } = await usersService.deleteUser(usersData)(+id);

            if (error === serviceErrors.RECORD_NOT_FOUND) {
                res.status(404).send({ message: 'User not found!' });
            } else {
                res.status(200).send({ message: 'User was deleted successfully!' });
            }
        })
    .post('/books',
        authMiddleware,
        roleMiddleware(['admin']),
        createValidator(createBookSchema),
        async (req, res) => {
            const { title, description, author, status, genre, year } = req.body;
            const { error, book } = await booksService.createBook(booksData)(title, description, author, genre, year, status);

            if (error === serviceErrors.DUPLICATE_RECORD) {
                res.status(409).send({ message: 'Book is already in library!' });
            } else {
                res.status(201).send(book);
            }
        })
    .put('/books/:id',
        authMiddleware,
        roleMiddleware(['admin']),
        createValidator(updateBookSchema),
        async (req, res) => {
            const { id } = req.params;
            const bookInfo = req.body;
            const { error } = await booksService.updateBook(booksData)(bookInfo, +id);

            if (error === serviceErrors.RECORD_NOT_FOUND) {
                res.status(409).send({ message: 'Book not found!' });
            } else {
                res.status(201).send({ message: 'You have updated the chosen book!' });
            }
        })
    .delete('/books/:id',
        // authMiddleware,
        // roleMiddleware(['admin']),
        async (req, res) => {
            const { id } = req.params;
            const { error, book } = await booksService.deleteBook(booksData)(+id);

            if (error === serviceErrors.RECORD_NOT_FOUND) {
                res.status(409).send({ message: 'Book not found!' });
            } else {
                res.status(201).send(book);
            }
        })
    .delete('/books/:id/reviews/:id',
        // authMiddleware,
        // roleMiddleware(['admin']),
        async (req, res) => {
            const url = req.originalUrl;
           // const userId = req.user.id;
            //const role = req.user.role;

            const { error, review } = await booksService.deleteReview(booksData)(url)
                // +userId, role);

            if (error === serviceErrors.RECORD_NOT_FOUND) {
                res.status(409).send({ message: 'Book/review not found!' });
            } else {
                res.status(201).send(review);
            }
        })
    .put('/books/:id/reviews/:id',
        authMiddleware,
        roleMiddleware(['admin']),
        async (req, res) => {
            const { error, review } = await booksService.updateReview(booksData)(req);

            if (error === serviceErrors.RECORD_NOT_FOUND) {
                res.status(409).send({ message: 'Book/review not found!' });
            } else {
                res.status(201).send(review);
            }
        })
    .post('/books/:id/reviews',
        authMiddleware,
        roleMiddleware(['admin']),
        async (req, res) => {

            const { error, review } = await booksService.createReview(booksData)(req);

            if (error === serviceErrors.RECORD_NOT_FOUND) {
                res.status(409).send({ message: 'Book not found!' });
            } else {
                res.status(201).send(review);
            }
        })
    .post('/users/:id/banstatus',
        // authMiddleware,
        // roleMiddleware(['admin']),
        // createValidator(banUserSchema),
        async (req, res) => {
            const userId = req.params.id;
            const { description, expirationDate } = req.body;
            //const adminId = req.user.id;

            const { error, ban } = await usersService.banUser(usersData, gamificationData)(description, expirationDate, +userId)
                //  +adminId);
            if (error === serviceErrors.DUPLICATE_RECORD) {
                res.status(409).send({ message: 'The user has already been banned!' });
            } else if (error === serviceErrors.RECORD_NOT_FOUND) {
                res.status(409).send({ message: 'The user does not exist!' });
            } else if (error === serviceErrors.OPERATION_NOT_PERMITTED) {
                res.status(409).send({ message: 'You cannot ban yourself!' });
            } else {
                const _ = await gamificationService.removeUserPoints(usersData, gamificationData)(userId);
                res.status(201).send(ban);
            }
        });


export default adminsController;