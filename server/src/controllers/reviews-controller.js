import express from 'express';
import booksService from '../services/books-service.js';
import booksData from '../data/books-data.js';
import serviceErrors from '../services/service-errors.js';
import gamificationService from '../services/gamification-service.js';
import gamificationData from '../data/gamification-data.js';
import { authMiddleware, roleMiddleware } from '../auth/auth-middleware.js';
import { validateBanStatusMiddleware } from '../validations/index_2.js';

const reviewsController = express.Router();

reviewsController

    .put('/:id/vote',
        authMiddleware,
        roleMiddleware(['admin', 'user']),
        validateBanStatusMiddleware(),
        async (req, res) => {
            const reviewId = req.params.id;
            console.log(reviewId);
            const vote = req.body.vote;
            console.log(vote);
            const userId = req.user.id;

            const { error, review, author } = await booksService.voteReview(booksData)(+reviewId, +userId, vote);
            
            if (error === serviceErrors.RECORD_NOT_FOUND) {
                return res.status(409).send({ message: 'Review not found!' });
            }
            
            if (review.message === 'Your vote is saved!') {
                gamificationService.addUserPoints(gamificationData)(author);
            }
            res.status(201).send(review);

        });

export default reviewsController;
