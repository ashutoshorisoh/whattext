import React, { createContext, useState, useContext, useEffect } from 'react';

const DarkModeContext = createContext();

export function DarkModeProvider({ children }) {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const savedDarkMode = localStorage.getItem('darkMode') === 'true';
        setDarkMode(savedDarkMode);
    }, []);

    const toggleDarkMode = () => {
        setDarkMode(prevMode => {
            const newMode = !prevMode;
            localStorage.setItem('darkMode', newMode);
            return newMode;
        });
    };

    return (
        <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    );
}

export function useDarkMode() {
    return useContext(DarkModeContext);
}
