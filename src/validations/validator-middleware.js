/* eslint-disable no-unused-vars */
import usersData from '../data/users-data.js';

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
        const userId = req.user.id;
        const banStatus = await usersData.getBanStatus(+userId);

        if (!banStatus) {
            next();
        } else {
            const banStatusId = banStatus.idban_status;
            const test = await usersData.getExpDate(+userId);

            if (+(test.dateDiff) > 0) {
                return res.status(400).send({ message: 'Bannat si brat.' });
            }
            if (+(test.dateDiff) < 0) {
                const _ = await usersData.deleteBan(banStatusId);
                next();
            }
        }
    };
};


