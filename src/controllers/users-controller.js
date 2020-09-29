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

        const foundUsers = await usersData.checkForUsername(username);
        const loggedUser = await foundUsers.find((user) => user.password === password);

        res.status(200).send(loggedUser);
    })
    .post('/logout', async (req, res) => {
        res.status(200).send({ message: 'You have logged out! '});
    })
    .delete(() => {

    });

export default usersController;