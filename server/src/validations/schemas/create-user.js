export const createUserSchema = {
    username: value => {
        if (!value) {
            return 'Username is required';
        }
        
        if (typeof value !== 'string' || value.trim().length < 4 || value.trim().length > 25) {
            return 'Username should be a string in range [3..25]';
        }

        return null;
    },
    password: value => {
        if (!value) {
            return 'Password is required';
        }
        
        if (typeof value !== 'string' || value.trim().length < 4 || value.trim().length > 25) {
            return 'Password should be a string in range [3..25]';
        }

        return null;
    },
    passwordConfirm: value => {
        if (!value) {
            return 'Password is required';
        }
        
        if (typeof value !== 'string' || value.trim().length < 4 || value.trim().length > 25) {
            return 'Password should be a string in range [3..25]';
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