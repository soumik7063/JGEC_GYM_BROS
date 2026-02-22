import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [manualUser, setManualUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Load user and token from localStorage on mount
        const savedUser = localStorage.getItem('gymbro_user');
        const savedToken = localStorage.getItem('gymbro_token');
        if (savedUser) {
            setManualUser(JSON.parse(savedUser));
        }
        if (savedToken) {
            setToken(savedToken);
        }
        setLoading(false);
    }, []);

    const loginManual = (userData, userToken) => {
        setManualUser(userData);
        setToken(userToken);
        localStorage.setItem('gymbro_user', JSON.stringify(userData));
        localStorage.setItem('gymbro_token', userToken);
    };

    const logoutManual = () => {
        setManualUser(null);
        setToken(null);
        localStorage.removeItem('gymbro_user');
        localStorage.removeItem('gymbro_token');
    };

    return (
        <AuthContext.Provider value={{ manualUser, token, loginManual, logoutManual, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
