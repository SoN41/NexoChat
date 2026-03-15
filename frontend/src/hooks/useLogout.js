import { useState } from "react";
import { useAuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { auth } from "../firebase/firebase.config"; // 1. Import Firebase auth
import { signOut } from "firebase/auth"; // 2. Import signOut function

const useLogout = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const logout = async () => {
        setLoading(true);
        try {
            // Step 1: Tell Firebase to log the user out (Applies to Google users)
            await signOut(auth);

            // Step 2: Tell your backend to clear the JWT cookie (Applies to Local users)
            const res = await fetch('/api/auth/logout', {
                method: 'POST',
                headers: { // FIXED: Added the headers object wrapper
                    "Content-Type": 'application/json'
                }
            });
            
            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }

            // Step 3: Clear the browser storage and React state
            localStorage.removeItem("chat-user");
            setAuthUser(null);
            
        } catch (error) {
            // FIXED: Corrected spelling to toast.error and error.message
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };
    
    return { loading, logout };
}

export default useLogout;