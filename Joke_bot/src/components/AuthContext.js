import { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const apiKey = process.env.REACT_APP_API_KEY;


    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, username, setUsername, apiKey }}>
            {children}
        </AuthContext.Provider>
    );
};
