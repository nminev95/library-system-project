import express from 'express';
import usersService from '../services/users-service.js';
import usersData from '../data/users-data.js';
import serviceErrors from '../services/service-errors.js';
import { createValidator, createUserSchema, updateUserSchema } from '../validations/index_2.js';
import { authMiddleware, roleMiddleware } from '../auth/auth-middleware.js';

const usersController = express.Router();

usersController
    .get('/', async (req, res) => {
        const { search } = req.query;
        const users = await usersService.getAllUsers(usersData)(search);

        res.status(200).send(users);
    })
    .get('/:id',
        authMiddleware,
        roleMiddleware('user'),
        async (req, res) => {
            const { id } = req.params;

            const { error, user } = await usersService.getUserById(usersData)(+id);

            if (error === serviceErrors.RECORD_NOT_FOUND) {
                res.status(404).send({ message: 'User not found!' });
            } else {
                res.status(200).send(user);
            }
        })
   
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
        async (req, res) => {
            const { id } = req.params;
            const updateData = req.body;

            console.log(updateData);

            const { error, user } = await usersService.updateUser(usersData)(+id, updateData);

            if (error === serviceErrors.RECORD_NOT_FOUND) {
                res.status(404).send({ message: 'User not found!' });
            } else if (error === serviceErrors.DUPLICATE_RECORD) {
                res.status(409).send({ message: 'Name not available' });
            } else {
                res.status(200).send(user);
            }
        })
    .delete('/:id', async (req, res) => {
        const { id } = req.params;
        const { error, user } = await usersService.deleteUser(usersData)(+id);

        if (error === serviceErrors.RECORD_NOT_FOUND) {
            res.status(404).send({ message: 'User not found!' });
        } else {
            res.status(200).send(user);
        }
    });

export default usersController;
