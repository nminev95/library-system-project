export const updateBookSchema = {
    title: value => {
        if (value === undefined) {
            return null;
        }

        if (typeof value !== 'string' || value.trim().length < 0 || value.trim().length > 45) {
            return 'Title should be a string in range [0..45]';
        }

        return null;
    },
    author: value => {
        if (value === undefined) {
            return null;
        }

        if (typeof value !== 'string' || value.trim().length < 0 || value.trim().length > 45) {
            return 'Author should be a string in range [0..45]';
        }

        return null;
    },
    description: value => {
        if (value === undefined) {
            return null;
        }

        if (typeof value !== 'string' || value.trim().length < 3 || value.trim().length > 45) {
            return 'Description should be a string in range [3..45]';
        }

        return null;
    },
};