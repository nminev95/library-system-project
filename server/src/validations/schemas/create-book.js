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

        if (typeof value !== 'string' || value.trim().length < 15 || value.trim().length > 445) {
            return 'Description should be a string in range [15..45]';
        }

        return null;
    },
    genre: value => {
        if (!value) {
            return 'Book genre is required';
        }

        if (typeof value !== 'string' || value.trim().length > 15) {
            return 'Genre should be a valid value';
        }

        return null;
    },
    year: value => {
        if (!value) {
            return 'Book year is required';
        }

        if (typeof value !== 'string' || value.trim().length > 4) {
            return 'Year should be a valid value';
        }

        return null;
    },
    status: value => {
        if (!value) {
            return 'Book status is required';
        }

        if (typeof value !== 'string' || value.trim().length > 10) {
            return 'Status should be a valid value';
        }

        return null;
    },
    cover: value => {
        if (!value) {
            return "Book cover url required";
        }
        return null;
    }
};