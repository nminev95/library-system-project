export const createBookSchema = {
    title: value => {
        if (!value) {
            return 'Title is required';
        }

        if (typeof value !== 'string' || value.trim().length < 0 || value.trim().length > 25) {
            return 'Title should be a string in range [0..25]';
        }

        return null;
    },
    author: value => {
        if (!value) {
            return 'Author is required';
        }

        if (typeof value !== 'string' || value.trim().length < 0 || value.trim().length > 25) {
            return 'Author should be a string in range [0..25]';
        }

        return null;
    },
    description: value => {
        if (!value) {
            return 'Description is required';
        }

        if (typeof value !== 'string' || value.trim().length < 3 || value.trim().length > 45) {
            return 'Description should be a string in range [3..45]';
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