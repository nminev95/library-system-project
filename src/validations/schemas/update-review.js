export const updateReviewSchema = {
    content: value => {
        if (!value) {
            return 'Content is required';
        }

        if (typeof value !== 'string' || value.trim().length < 3 || value.trim().length > 100) {
            return 'Content should be a string in range [3..100]';
        }

        return null;
    },
};