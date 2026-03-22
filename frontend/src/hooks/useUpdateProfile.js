import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useUpdateProfile = () => {
    const [loading, setLoading] = useState(false);
    const { authUser, setAuthUser } = useAuthContext();

    const updateProfile = async ({ fullName, username, bio, profilePic }) => {
        setLoading(true);
        try {
            // ✅ Build headers with auth token (same pattern as useSendMessage)
            let headers = { "Content-Type": "application/json" };

            if (authUser?.uid) {
                const user = auth.currentUser;
                if (user) {
                    const token = await user.getIdToken();
                    headers["Authorization"] = `Bearer ${token}`;
                }
            }

            const res = await fetch("/api/users/update", {
                method: "PUT",
                headers,
                body: JSON.stringify({ fullName, username, bio, profilePic }),
            });

            const data = await res.json();
            if (data.error) throw new Error(data.error);

            localStorage.setItem("chat-user", JSON.stringify(data));
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