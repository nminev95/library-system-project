import express from 'express';
import usersService from '../services/users-service.js';
import usersData from '../data/users-data.js';
import serviceErrors from '../services/service-errors.js';
import { createValidator, createUserSchema, updateUserSchema } from '../validations/index_2.js';
import { authMiddleware, roleMiddleware } from '../auth/auth-middleware.js';

const usersController = express.Router();

usersController
    .post('/',
        createValidator(createUserSchema),
        async (req, res) => {
            const createData = req.body;

            const { error, user } = await usersService.createUser(usersData)(createData);
            if (error === serviceErrors.DUPLICATE_RECORD) {
                res.status(409).send({ message: 'Name not available' });
            } else {
                res.status(201).send(user);
            }
        })
    .put('/:id',
        createValidator(updateUserSchema),
        authMiddleware,
        roleMiddleware('user'),
        async (req, res) => {
            const { id } = req.params;
            const updateData = req.body;
            const loggedId = usersService.getLoggedUserId(req);

            if (+(id) !== +(loggedId)) {
                res.status(400).send({ message: 'Users can only change their own usernames!' });
                return;
            }

            const { error, user } = await usersService.updateUser(usersData)(+id, updateData);

            if (error === serviceErrors.RECORD_NOT_FOUND) {
                res.status(404).send({ message: 'User not found!' });
            } else if (error === serviceErrors.DUPLICATE_RECORD) {
                res.status(409).send({ message: 'Name not available' });
            } else {
                res.status(200).send(user);
            }
        });

export default usersController;
