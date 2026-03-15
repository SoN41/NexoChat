import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import { auth } from "../firebase/firebase.config"; 
import { useAuthContext } from "../context/AuthContext"; // Import AuthContext

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();
  const { authUser } = useAuthContext(); // Get current user state

  useEffect(() => {
    const getMessages = async () => {
        setLoading(true);
        try {
            let headers = {};

            // Check if this is a Firebase Google User (they have a 'uid')
            if (authUser?.uid) {
                const user = auth.currentUser;
                if (user) {
                    const token = await user.getIdToken();
                    headers["Authorization"] = `Bearer ${token}`;
                }
            } else if (!authUser) {
                return; // Prevent fetching if no one is logged in
            }

            // The fetch request uses the dynamic headers
            // Local users will automatically send their JWT cookie here
            const res = await fetch(`/api/messages/${selectedConversation._id}`, {
                method: "GET",
                headers: headers
            });
            
            const data = await res.json();
            if (data.error) throw new Error(data.error);
            
            setMessages(data);
        } catch (error) {
            toast.error(error.message);            
        } finally {
            setLoading(false);
        }
    }
    
    if (selectedConversation?._id) getMessages();
  }, [selectedConversation?._id, setMessages, authUser]);
  
  return { messages, loading };
}

export default useGetMessages;