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

            const { error } = await usersService.createUser(usersData)(createData);
            if (error === serviceErrors.DUPLICATE_RECORD) {
                res.status(409).send({ message: 'Name not available' });
            } else {
                res.status(201).send({ message: `Account name ${createData.username} has been created!` });
            }
        })
    .put('/:id',
        createValidator(updateUserSchema),
        authMiddleware,
        roleMiddleware(['user']),
        async (req, res) => {
            const { id } = req.params;
            const updateData = req.body;
            const loggedUser = req.user;

            const { error } = await usersService.updateUser(usersData)(+id, updateData, loggedUser);

            if (error === serviceErrors.RECORD_NOT_FOUND) {
                res.status(404).send({ message: 'User not found!' });
            } else if (error === serviceErrors.DUPLICATE_RECORD) {
                res.status(409).send({ message: 'Name not available' });
            } else if (error === serviceErrors.OPERATION_NOT_PERMITTED) {
                res.status(409).send({ message: 'Users can only change their own usernames!' });
            } else {
                res.status(200).send({ message: 'You have successfully updated your account info!' });
            }
        });

export default usersController;
