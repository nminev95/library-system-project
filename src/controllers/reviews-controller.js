import express from 'express';
import reviewsData from '../data/reviews-data.js';
import reviewsService from '../services/reviews-service.js';
import serviceErrors from '../services/service-errors.js';
import { authMiddleware, roleMiddleware } from '../auth/auth-middleware.js';
import { validateBanStatusMiddleware } from '../validations/index_2.js';

const reviewsController = express.Router();

reviewsController

    .put('/:id/vote',
        authMiddleware,
        roleMiddleware('user'),
        validateBanStatusMiddleware(),
        async (req, res) => {
            const reviewId = req.params.id;
            const vote = (Object.values(req.body)).toString();
            const userId = req.user.id;

            const { error, review } = await reviewsService.voteBook(reviewsData)(+reviewId, +userId, +vote);

            if (error === serviceErrors.RECORD_NOT_FOUND) {
                return res.status(409).send({ message: 'Review not found!' });
            }

            res.status(201).send(review);

        });

export default reviewsController;
