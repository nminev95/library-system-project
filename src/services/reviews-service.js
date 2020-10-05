/* eslint-disable no-unused-vars */
import serviceErrors from './service-errors.js';




const voteBook = reviewsData => {
    return async (reviewId, userId, vote) => {
        const review = await reviewsData.getReviewById(reviewId);
        console.log(review);

        if (review.length === 0) {
            return {
                error: serviceErrors.RECORD_NOT_FOUND,
                book: null,
            };
        }

        const existingVote = await reviewsData.getUserVoteForBook(reviewId, userId);

        if (existingVote.length === 0) {
            const _ = await reviewsData.insertVote(reviewId, vote, userId);
            return { error: null, review: { message: 'Your vote is saved!' } };
        } else {
            const currentVote = +(existingVote[0].vote_Id);
            if (currentVote === 1) {
                const _ = await reviewsData.updateVote(2, reviewId, userId);
                return { error: null, review: { message: 'Your vote has been updated!' } };
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