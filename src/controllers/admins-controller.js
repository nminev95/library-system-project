import express from 'express';
import { authMiddleware, roleMiddleware } from '../auth/auth-middleware.js';
import serviceErrors from '../services/service-errors.js';
import adminsService from '../services/admins-service.js';
import adminsData from '../data/admins-data.js';


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
    .get('/:id',
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
    .delete('/:id',
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
        async (req, res) => {
            const bookInfo = req.body;
            const { error, book } = await adminsService.createBook(adminsData)(bookInfo);

            if (error === serviceErrors.DUPLICATE_RECORD) {
                res.status(409).send({ message: 'Book is already in library!' });
            } else {
                res.status(201).send(book);
            }
        })
    .put('/books/:id',
        authMiddleware,
        roleMiddleware('admin'),
        async (req, res) => {
            const { id } = req.params;
            const bookInfo = req.body;
            const { error, book } = await adminsService.updateBook(adminsData)(bookInfo, +id);

            if (error === serviceErrors.RECORD_NOT_FOUND) {
                res.status(409).send({ message: 'Book not found!' });
            } else {
                res.status(201).send(book);
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
            const regex = /[0-9]+/g;
            const paramsInfo = req.originalUrl;
            const result = paramsInfo.match(regex);
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
        });





export default adminsController;