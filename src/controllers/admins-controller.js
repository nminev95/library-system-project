import express from 'express';
import { authMiddleware, roleMiddleware } from '../auth/auth-middleware.js';
import serviceErrors from '../services/service-errors.js';
import adminsService from '../services/admins-service.js';
import adminsData from '../data/admins-data.js';


const adminsController = express.Router();

adminsController
    .get('/',
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
        });


export default adminsController;