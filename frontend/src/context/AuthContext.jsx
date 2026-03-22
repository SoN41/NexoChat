import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config"; 
import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext();

export const useAuthContext = () => {
    return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
    // 1. Initialize state by checking localStorage FIRST for custom backend users
    const [authUser, setAuthUser] = useState(() => {
        const localUser = localStorage.getItem("chat-user");
        return localUser ? JSON.parse(localUser) : null;
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
                // If Firebase recognizes a Google user, use that
                setAuthUser(firebaseUser);
            } else {
                // If Firebase has no user, double-check localStorage so we don't accidentally overwrite a custom login with 'null'
                const localUser = localStorage.getItem("chat-user");
                if (!localUser) {
                    setAuthUser(null);
                }
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ authUser, setAuthUser, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};