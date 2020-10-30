import express from 'express';
import usersService from '../services/users-service.js';
import usersData from '../data/users-data.js';
import serviceErrors from '../services/service-errors.js';
import { createValidator, createUserSchema, updateUserSchema } from '../validations/index_2.js';
import { authMiddleware, roleMiddleware } from '../auth/auth-middleware.js';

const usersController = express.Router();

usersController
    .get('/:id',
    authMiddleware,
    roleMiddleware(['admin', 'user']),
    async (req, res) => {
        const { id } = req.params;
        const loggedUser = req.user;

        const { error, user } = await usersService.getUserById(usersData)(+id, loggedUser);

        res.status(200).send(user)
    })
    .post('/',
        createValidator(createUserSchema),
        async (req, res) => {
            const createData = req.body;

            const { error, user } = await usersService.createUser(usersData)(createData);
            if (error === serviceErrors.DUPLICATE_RECORD) {
                res.status(409).send({ message: 'Name not available' });
            } else if (error === serviceErrors.NO_MATCH) {
                res.status(409).send({ message: 'Passwords don\'t match' });
            } else {
                res.status(201).send(user);
            }
        })
    .put('/:id',
        createValidator(updateUserSchema),
        authMiddleware,
        roleMiddleware(['user', 'admin']),
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
            } else if (error === serviceErrors.NO_MATCH) {
                res.status(400).send({ message: 'Password is invalid!'})
            } else {
                res.status(200).send({ message: 'You have successfully updated your account info!' });
            }
        })
        .put('/:id/password', 
        authMiddleware,
        roleMiddleware(['user', 'admin']),
        async (req, res) => {
            const { id } = req.params;
            const updateData = req.body;
            const loggedUser = req.user;    
      
            const { error, user } = await usersService.updateUserPassword(usersData)(+id, updateData, loggedUser);

            if (error === serviceErrors.NO_MATCH) {
                res.status(400).send({ message: 'Password is invalid!'})
            } else {
                res.status(201).send(user)
            }
        }) 
    
export default usersController;
