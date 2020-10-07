/* eslint-disable no-unused-vars */
import pool from '../data/pool.js';

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
        const banStatus = await getBanStatus(+userId);

        if (!banStatus) {
            next();
        } else {
            const banStatusId = banStatus.idban_status;
            const test = await getExpDate(+userId);

            if (+(test.dateDiff) > 0) {
                return res.status(400).send({ message: 'Bannat si brat.' });
            }
            if (+(test.dateDiff) < 0) {
                const _ = await deleteBan(banStatusId);
                next();
            }
        }
    };
};

const getExpDate = async (id) => {
    const sql = 'SELECT DATEDIFF((SELECT expirationDate FROM ban_status WHERE user_Id = ?), (SELECT NOW())) as dateDiff';

    const res = await pool.query(sql, [id]);

    return res[0];
};

const getBanStatus = async (id) => {
    const sql = `
    SELECT * FROM ban_status WHERE user_Id = ?;
    `;

    const ban = await pool.query(sql, [id]);
    return ban[0];
};

const deleteBan = async (banStatusId) => {
    const sql = 'DELETE FROM ban_status WHERE idban_status = ?';

    return await pool.query(sql, [banStatusId]);
};

export default getExpDate;