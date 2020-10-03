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
    .delete('/:id', async (req, res) => {
        const { id } = req.params;
        const { error, user } = await adminsService.deleteUser(adminsData)(+id);

        if (error === serviceErrors.RECORD_NOT_FOUND) {
            res.status(404).send({ message: 'User not found!' });
        } else {
            res.status(200).send(user);
        }
    });


export default adminsController;