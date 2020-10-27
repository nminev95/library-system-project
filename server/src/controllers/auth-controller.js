import express from 'express';
import createToken from './../auth/create-token.js';
import usersService from '../services/users-service.js';
import usersData from '../data/users-data.js';
import serviceErrors from '../services/service-errors.js';
import { authMiddleware, blacklistTokenMiddleware } from '../auth/auth-middleware.js';
const authController = express.Router();

authController
    .post('/signin', async (req, res) => {
        const { username, password } = req.body;
        const { error, user } = await usersService.signInUser(usersData)(username, password);

        if (error === serviceErrors.INVALID_SIGNIN) {
            res.status(400).send({
                message: 'Invalid username/password',
            });
        } else {
            const payload = {
                sub: user.user_Id,
                username: user.username,
                email: user.email,
                level: {
                    points: user.user_points,
                    level: user.user_level
                },
                role: user.role,
                registered: user.register_date,
                banInfo: {
                    banned: user.isBanned,
                    banExpiration: user.expirationDate,
                },
            };
            const token = createToken(payload);

            res.status(200).send({
                token: token,
            });
        }
    })
    .post('/signout',
        authMiddleware,
        blacklistTokenMiddleware(),
        async (req, res) => {
            req.logout();
            res.status(200).send({ message: 'Successfull logout!' });
        });

export default authController;
