/* eslint-disable no-unused-vars */
import usersData from '../data/users-data.js';
import usersService from '../services/users-service.js';

export const createValidator = schema => {
    return (req, res, next) => {
        const body = req.body;
        const bodyKeys = Object.keys(body);
        const validations = Object.keys(schema);


        if (bodyKeys.length > validations.length) {
            res.status(400).send({ message: 'You have entered more properties than needed!' });
        }

        const fails = validations
            .map(v => schema[v](body[v]))
            .filter(e => e !== null);

        if (fails.length > 0) {
            res.status(400).send(fails);
        } else {
            next();
        }
    };
};

export const validateBanStatusMiddleware = () => {
    return async (req, res, next) => {
        const isBanned = req.user.banInfo.banned;
        const expirationDate = req.user.banInfo.banExpiration;

        if (!isBanned) {
            next();
        } else {
            if (new Date() < new Date(expirationDate))
                return res.status(400).send({ message: 'Bannat si brat.' });
            if (new Date() > new Date(expirationDate)) {
                const _ = await usersService.removeBan(usersData)(req.user);
                next();
            }
        }
    };
};

