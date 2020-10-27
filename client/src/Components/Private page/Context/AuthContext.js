import { createContext } from 'react';
import React from 'react';

export const AuthContext = createContext({
    isLoggedIn: false,
    user: null,
    setLoginState: () => {}
});


export const useAuth = () => React.useContext(AuthContext);
export default AuthContext;