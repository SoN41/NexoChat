import { createContext, useContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

export const useThemeContext = () => {
    return useContext(ThemeContext);
};

export const ThemeContextProvider = ({ children }) => {
    // We default to "dark" because your current UI is built for dark mode
    const [theme, setTheme] = useState(
        localStorage.getItem("chat-theme") || "dark"
    );

    useEffect(() => {
        const root = window.document.documentElement;
        
        // Add or remove the 'dark' class on the <html> element
        if (theme === "dark") {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
        
        // Save preference for the next visit
        localStorage.setItem("chat-theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};