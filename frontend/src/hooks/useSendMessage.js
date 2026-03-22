import { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import { auth } from "../firebase/firebase.config"; 
import { useAuthContext } from "../context/AuthContext"; // Import AuthContext

const useSendMessage = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();
    const { authUser } = useAuthContext(); // Get current user state

    const sendMessage = async (message) => {
        setLoading(true);
        try {
            if (!authUser) throw new Error("You must be logged in to send a message.");

            // Always include Content-Type for POST requests
            let headers = {
                'Content-Type': 'application/json'
            };

            // If it's a Firebase user, append the Authorization token
            if (authUser?.uid) {
                const user = auth.currentUser;
                if (user) {
                    const token = await user.getIdToken();
                    headers["Authorization"] = `Bearer ${token}`;
                }
            }

            const res = await fetch(`/api/messages/send/${selectedConversation._id}`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify( message )
            });
            
            const data = await res.json();
            if (data.error) throw new Error(data.error);

            setMessages([...messages, data]);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }
    
    return { sendMessage, loading };
}

export default useSendMessage;