import express from 'express';
import usersService from '../services/users-service.js';
import usersData from '../data/users-data.js';

const usersController = express.Router();

usersController
    .get(() => {

    })

    .get(() => {

    })

    .put(() => {

    })

    .post('/login', async (req, res) => {
        const username = req.body.username;
        const password = req.body.password;

        try {
            const foundUsers = await usersData.findUser(username);
            if (foundUsers.length === 0) {
                res.status(400).json({ message: `Username ${username} does not exist!` });
            }
            const loggedUser = await foundUsers.find((user) => user.password === password);
            if (!loggedUser) {
                res.status(400).json({ message: 'Password is incorrect!' });
            }
            res.status(200).send(loggedUser);
        } catch (err) {
            res.status(404).send({ message: err });
        }
    })
    .post('/logout', async (req, res) => {
        res.status(200).send({ message: 'You have logged out! ' });
    })
    .delete(() => {

    });

export default usersController;
