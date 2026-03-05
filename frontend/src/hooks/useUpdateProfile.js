import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useUpdateProfile = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const updateProfile = async ({ fullName, username, bio, profilePic }) => {
        setLoading(true);
        try {
            // Adjust the endpoint to match your backend route
            const res = await fetch("/api/users/update", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ fullName, username, bio, profilePic }),
            });

            const data = await res.json();

            if (data.error) {
                throw new Error(data.error);
            }

            // 1. Update Local Storage so the session persists on refresh
            localStorage.setItem("chat-user", JSON.stringify(data));

            // 2. Update Global Context to refresh the UI immediately
            setAuthUser(data);
            
            toast.success("Profile updated successfully!");
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, updateProfile };
};

export default useUpdateProfile;