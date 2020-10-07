/* eslint-disable no-unused-vars */
import serviceErrors from './service-errors.js';
import booksData from '../data/books-data.js';

const voteBook = reviewsData => {
    return async (reviewId, userId, vote) => {
        const review = await reviewsData.getReviewById(reviewId);

        if (review.length === 0) {
            return {
                error: serviceErrors.RECORD_NOT_FOUND,
                book: null,
            };
        }

        const existingVote = await reviewsData.getUserVoteForBook(reviewId, userId);

        if (existingVote.length === 0) {
            const _ = await reviewsData.insertVote(reviewId, vote, userId);
            if (vote === 1) {
                const addPoint = await booksData.addPoint(userId);
                const pointsInfo = await booksData.getPoints(userId);
                if (pointsInfo[0].user_points % 10 === 0 && pointsInfo[0].user_points <= 50) {
                    const update = await booksData.changeLevel(userId);
                }
            }
            return { error: null, review: { message: 'Your vote is saved!' } };
        } else {
            const currentVote = +(existingVote[0].vote_Id);
            if (currentVote === 1 && vote === 2) {
                const _ = await reviewsData.updateVote(2, reviewId, userId);
                return { error: null, review: { message: 'Your vote has been updated!' } };
            } else if (currentVote === 1 && vote === 1) {
                return { error: null, review: { message: 'You have already liked this review!' } };
            } else if (currentVote === 2 && vote === 2) {
                return { error: null, review: { message: 'You have already disliked this review!' } };
            } else {
                const _ = await reviewsData.updateVote(1, reviewId, userId);
                return { error: null, review: { message: 'Your vote has been updated!' } };
            }
        }

    };
};

export default {
    voteBook,
};