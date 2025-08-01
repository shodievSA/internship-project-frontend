import { useState, useEffect, createContext, useContext } from "react";

const ThemeContext = createContext();

function ThemeContextProvider({ children }) {
	const [themeMode, setThemeMode] = useState(() => {
		const theme = localStorage.getItem("theme");
		return theme === "dark" ? "dark" : "light";
	});

	useEffect(() => {
		if (themeMode === "dark") {
			const rootElement = document.getElementById("root");
			rootElement.classList.add("dark-mode");
		}
	}, []);

	useEffect(() => {
		if (themeMode === "light") {
			const rootElement = document.getElementById("root");
			rootElement.classList.remove("dark-mode");
		} else {
			const rootElement = document.getElementById("root");
			rootElement.classList.add("dark-mode");
		}

		localStorage.setItem("theme", themeMode);
	}, [themeMode]);

	return (
		<ThemeContext.Provider value={{ themeMode, setThemeMode }}>
			{children}
		</ThemeContext.Provider>
	);
}

export function useThemeContext() {
	return useContext(ThemeContext);
}

export default ThemeContextProvider;
