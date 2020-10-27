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
    email: value => {
        if (!value) {
            return 'Email is required';
        }
        const check = new RegExp(/^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/);
        if(!check.test(value)){
            return 'Enter a valid email';
        }
        return null;
    },
};