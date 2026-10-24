import { useEffect, useState } from "react";
import { ThemeContext } from "./themeContext";

const getInitialTheme = () => {
    try {
        return localStorage.getItem("theme") === "dark"
            ? "dark"
            : "light";
    } catch {
        return "light";
    }
};

const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(getInitialTheme);

    useEffect(() => {
        document.documentElement.classList.toggle(
            "dark",
            theme === "dark"
        );

        try {
            localStorage.setItem("theme", theme);
        } catch {
            // Theme still works for the current session.
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme((current) =>
            current === "dark" ? "light" : "dark"
        );
    };

    return (
        <ThemeContext.Provider
            value={{
                theme,
                setTheme,
                toggleTheme,
                isDark: theme === "dark",
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;