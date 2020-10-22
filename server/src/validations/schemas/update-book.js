export const updateBookSchema = {
    title: value => {
        if (value === undefined) {
            return null;
        }

        if (typeof value !== 'string' || value.trim().length < 6 || value.trim().length > 45) {
            return 'Title should be a string in range [6..45]';
        }

        return null;
    },
    author: value => {
        if (value === undefined) {
            return null;
        }

        if (typeof value !== 'string' || value.trim().length < 6 || value.trim().length > 45) {
            return 'Author should be a string in range [6..45]';
        }

        return null;
    },
    description: value => {
        if (value === undefined) {
            return null;
        }

        if (typeof value !== 'string' || value.trim().length < 15 || value.trim().length > 45) {
            return 'Description should be a string in range [15..45]';
        }

        return null;
    },
    genre: value => {
        if (value === undefined) {
            return null;
        }

        if (typeof value !== 'string' || value.trim().length > 15) {
            return 'Genre should be a valid value';
        }

        return null;
    },
    year: value => {
        if (value === undefined) {
            return null;
        }

        if (typeof value !== 'string' || value.trim().length > 4) {
            return 'Year should be a valid value';
        }

        return null;
    },
    status: value => {
        if (value === undefined) {
            return null;
        }

        if (typeof value !== 'string' || value.trim().length > 10) {
            return 'Status should be a valid value';
        }

        return null;
    },
};