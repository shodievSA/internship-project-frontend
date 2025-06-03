import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

function AuthContextProvider({ children }) {

    const [user, setUser] = useState(null);
    const [isUserFetched, setIsUserFetched] = useState(false);

    useEffect(() => {

        setTimeout(() => {

            setIsUserFetched(true);

        }, 5000); // immitating fetch request

    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, isUserFetched }} >
            { children }
        </AuthContext.Provider>
    )

}

export function useAuthContext() {

    return useContext(AuthContext);

}

export default AuthContextProvider;