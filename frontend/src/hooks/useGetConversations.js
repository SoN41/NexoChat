import { useEffect, useState } from "react";
import toast from 'react-hot-toast';
import { auth } from "../firebase/firebase.config"; 
import { useAuthContext } from "../context/AuthContext"; // Import your AuthContext

const useGetConversations = () => {
    const [loading, setLoading] = useState(false);
    const [conversations, setConversations] = useState([]);
    const { authUser } = useAuthContext(); // Get the current logged-in user state

    useEffect(() => {
        const getConversations = async () => {
            setLoading(true);
            try {
                let headers = {};

                // Determine if this is a Firebase Google User (they usually have a 'uid' instead of '_id')
                if (authUser && authUser.uid) {
                    const user = auth.currentUser;
                    if (user) {
                        const token = await user.getIdToken();
                        headers = {
                            "Authorization": `Bearer ${token}`
                        };
                    }
                } 
                // If authUser exists but has no 'uid', they are a local user.
                // We don't need to set headers because the browser will send the JWT cookie automatically.
                else if (!authUser) {
                    return; // Stop if no user is logged in at all
                }

                const res = await fetch('/api/users', { headers });
                
                const data = await res.json();
                if (data.error) throw new Error(data.error);
                
                setConversations(data);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (authUser) {
            getConversations();
        }
    }, [authUser]); // Run this effect whenever authUser changes

    return { loading, conversations };
};

export default useGetConversations;