import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config"; 
import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
    return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(null);
    const [loading, setLoading] = useState(true); // Added to prevent flickering

    useEffect(() => {
        // This listener automatically detects if a user is logged in
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthUser(user);
            } else {
                setAuthUser(null);
            }
            setLoading(false);
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ authUser, setAuthUser, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};