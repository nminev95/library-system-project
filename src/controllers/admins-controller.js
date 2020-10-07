import express from 'express';
import { authMiddleware, roleMiddleware } from '../auth/auth-middleware.js';
import serviceErrors from '../services/service-errors.js';
import adminsService from '../services/admins-service.js';
import adminsData from '../data/admins-data.js';
import { createValidator, banUserSchema, createBookSchema, updateBookSchema } from '../validations/index_2.js';

const adminsController = express.Router();

adminsController
    .get('/users',
        authMiddleware,
        roleMiddleware('admin'),
        async (req, res) => {
            const { search } = req.query;
            const users = await adminsService.getAllUsers(adminsData)(search);

            res.status(200).send(users);
        })
    .get('/users/:id',
        authMiddleware,
        roleMiddleware('admin'),
        async (req, res) => {
            const { id } = req.params;

            const { error, user } = await adminsService.getUserById(adminsData)(+id);

            if (error === serviceErrors.RECORD_NOT_FOUND) {
                res.status(404).send({ message: 'User not found!' });
            } else {
                res.status(200).send(user);
            }
        })
    .delete('/users/:id',
        authMiddleware,
        roleMiddleware('admin'),
        async (req, res) => {
            const { id } = req.params;

            const { error, user } = await adminsService.deleteUser(adminsData)(+id);

            if (error === serviceErrors.RECORD_NOT_FOUND) {
                res.status(404).send({ message: 'User not found!' });
            } else {
                res.status(200).send(user);
            }
        })
    .post('/books',
        authMiddleware,
        roleMiddleware('admin'),
        createValidator(createBookSchema),
        async (req, res) => {
            const { title, description, author, status } = req.body;
            const { error, book } = await adminsService.createBook(adminsData)(title, description, author, status);

            if (error === serviceErrors.DUPLICATE_RECORD) {
                res.status(409).send({ message: 'Book is already in library!' });
            } else {
                res.status(201).send(book);
            }
        })
    .put('/books/:id',
        authMiddleware,
        roleMiddleware('admin'),
        createValidator(updateBookSchema),
        async (req, res) => {
            const { id } = req.params;
            const bookInfo = req.body;
            const { error } = await adminsService.updateBook(adminsData)(bookInfo, +id);

            if (error === serviceErrors.RECORD_NOT_FOUND) {
                res.status(409).send({ message: 'Book not found!' });
            } else {
                res.status(201).send({ message: 'You have updated the chosen book!' });
            }
        })
    .delete('/books/:id',
        authMiddleware,
        roleMiddleware('admin'),
        async (req, res) => {
            const { id } = req.params;
            const { error, book } = await adminsService.deleteBook(adminsData)(+id);

            if (error === serviceErrors.RECORD_NOT_FOUND) {
                res.status(409).send({ message: 'Book not found!' });
            } else {
                res.status(201).send(book);
            }
        })
    .delete('/books/:id/reviews/:id',
        authMiddleware,
        roleMiddleware('admin'),
        async (req, res) => {
            const result = req.originalUrl.match(/[0-9]+/g);
            const bookId = result[0];
            const reviewId = result[1];

            const { error, review } = await adminsService.deleteReview(adminsData)(+bookId, +reviewId);

            if (error === serviceErrors.RECORD_NOT_FOUND) {
                res.status(409).send({ message: 'Book/review not found!' });
            } else {
                res.status(201).send(review);
            }
        })
    .put('/books/:id/reviews/:id',
        authMiddleware,
        roleMiddleware('admin'),
        async (req, res) => {
            const newReview = (Object.values(req.body)).toString();
            const result = req.originalUrl.match(/[0-9]+/g);
            const bookId = result[0];
            const reviewId = result[1];

            const { error, review } = await adminsService.updateReview(adminsData)(+bookId, +reviewId, newReview);

            if (error === serviceErrors.RECORD_NOT_FOUND) {
                res.status(409).send({ message: 'Book/review not found!' });
            } else {
                res.status(201).send(review);
            }
        })
    .post('/books/:id/reviews',
        authMiddleware,
        roleMiddleware('admin'),
        async (req, res) => {
            const newReview = (Object.values(req.body)).toString();
            const bookId = req.params.id;
            const userId = req.user.id;
            const { error, review } = await adminsService.createReview(adminsData)(+bookId, +userId, newReview);

            if (error === serviceErrors.RECORD_NOT_FOUND) {
                res.status(409).send({ message: 'Book not found!' });
            } else {
                res.status(201).send(review);
            }
        })
    .post('/users/:id/banstatus',
        authMiddleware,
        roleMiddleware('admin'),
        createValidator(banUserSchema),
        async (req, res) => {
            const userId = req.params.id;
            const { description, expirationDate } = req.body;
            const adminId = req.user.id;

            const { error, ban } = await adminsService.banUser(adminsData)(description, expirationDate, +userId, +adminId);
            if (error === serviceErrors.DUPLICATE_RECORD) {
                res.status(409).send({ message: 'The user has already been banned!' });
            } else if (error === serviceErrors.RECORD_NOT_FOUND) {
                res.status(409).send({ message: 'The user does not exist!' });
            } else if (error === serviceErrors.OPERATION_NOT_PERMITTED) {
                res.status(409).send({ message: 'You cannot ban yourself!' });
            } else {
                res.status(201).send(ban);
            }
        });


export default adminsController;