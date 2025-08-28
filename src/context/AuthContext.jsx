import { createContext, useContext, useState, useEffect } from "react";
const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

const AuthContext = createContext();

function AuthContextProvider({ children }) {
	const [user, setUser] = useState();
	const [isUserFetched, setIsUserFetched] = useState(false);

	useEffect(() => {
		async function getUserData() {
			try {
				const res = await fetch(`${SERVER_BASE_URL}/api/v1/me`, {
					method: "GET",
					credentials: "include",
				});

				if (!res.ok) {
					const error = await res.json();
					throw new Error(error.error || "Failed to fetch user data");
				}

				const { user } = await res.json();
				setUser(user);
			} catch (error) {
				console.log(
					"Error occurred while fetching user data:",
					error.message
				);
				setUser(null);
			} finally {
				setIsUserFetched(true);
			}
		}

		getUserData();
	}, []);

	return (
		<AuthContext.Provider value={{ user, setUser, isUserFetched }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuthContext() {
	return useContext(AuthContext);
}

export default AuthContextProvider;
