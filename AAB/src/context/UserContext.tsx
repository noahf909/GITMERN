import React, { createContext, useState, ReactNode, useContext, useEffect } from 'react';

interface User {
    email: string;
}

interface UserContextType {
    user: User | null;
    setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user'); // Get user from localStorage
        if (storedUser) {
            setUser(JSON.parse(storedUser)); // Parse and set the stored user
        }
    }, []);

    const setUserInContext = (user: User | null) => {
        setUser(user);
        if (user) {
            localStorage.setItem('user', JSON.stringify(user)); // Save user to localStorage
        } else {
            localStorage.removeItem('user'); // Remove user from localStorage on sign out
        }
    };

    return (
        <UserContext.Provider value={{ user, setUser: setUserInContext }}>
            {children}
        </UserContext.Provider>
    );
};
