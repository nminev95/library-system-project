export const createBookSchema = {
    title: value => {
        if (!value) {
            return 'Title is required';
        }

        if (typeof value !== 'string' || value.trim().length < 6 || value.trim().length > 25) {
            return 'Title should be a string in range [6..25]';
        }

        return null;
    },
    author: value => {
        if (!value) {
            return 'Author is required';
        }

        if (typeof value !== 'string' || value.trim().length < 6 || value.trim().length > 25) {
            return 'Author should be a string in range [6..25]';
        }

        return null;
    },
    description: value => {
        if (!value) {
            return 'Description is required';
        }

        if (typeof value !== 'string' || value.trim().length < 15 || value.trim().length > 45) {
            return 'Description should be a string in range [15..45]';
        }

        return null;
    },
    status: value => {
        if (!value) {
            return 'Book status is required';
        }

        if (typeof value !== 'string' || value.trim().length > 1) {
            return 'Status should be a valid value';
        }

        return null;
    },
};