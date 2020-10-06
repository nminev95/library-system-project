export const banUserSchema = {
   description: value => {
        if (!value) {
            return 'Description is required';
        }
        
        if (typeof value !== 'string' || value.length < 3 || value.length > 100) {
            return 'Description should be a string in range [3..100]';
        }

        return null;
    },
    expirationDate: value => {
        if (!value) {
            return 'Expiration date is required';
        }
    
        const check = new RegExp(/^(19[5-9][0-9]|20[0-4][0-9]|2050)[-/](0?[1-9]|1[0-2])[-/](0?[1-9]|[12][0-9]|3[01])$/); 
        if(!check.test(value)){
        return 'Enter a date in a valid format!';
        }
     
        return null;
    },
};