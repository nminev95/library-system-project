import express from 'express';
import createToken from './../auth/create-token.js';
import usersService from '../services/users-service.js';
import usersData from '../data/users-data.js';
import serviceErrors from '../services/service-errors.js';

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
                role: user.role,
            };
            const token = createToken(payload);
        
            res.status(200).send({
                token: token,
            });
        }
        
    })
    .post('/signout', async (req, res) => {
        req.logout();
        console.log(req.user);
        //res.status(200).send({message:'Successfull logout'});
        res.redirect('/signin');
      });

export default authController;
