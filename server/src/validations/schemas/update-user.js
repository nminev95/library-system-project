export const updateUserSchema = {
    name: value => {
        if (!value) {
            return null;
        }
        
        if (typeof value !== 'string' || value.trim().length < 3 || value.trim().length > 25) {
            return 'Name should be a string in range [3..25]';
        }

        return null;
    },
};