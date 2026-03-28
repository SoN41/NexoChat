import { useState, useEffect } from "react";

const useTheme = () => {
    const [theme, setTheme] = useState(() => {
        // 1. Use saved preference if exists
        if (localStorage.getItem("chat-theme")) {
            return localStorage.getItem("chat-theme");
        }
        // 2. Otherwise follow system preference
        return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    });

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("chat-theme", theme);
    }, [theme]);

    const toggleTheme = () => setTheme(prev => prev === "dark" ? "light" : "dark");

    return { theme, toggleTheme };
};

export default useTheme;