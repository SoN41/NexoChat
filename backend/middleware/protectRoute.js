import jwt from "jsonwebtoken"; // Import standard JWT
import { adminAuth } from "../utils/firebaseAdmin.js";
import User from "../models/user.model.js";

const protectRoute = async (req, res, next) => {
    try {
        // 1. Look for Firebase token in headers
        const authHeader = req.headers.authorization;
        const firebaseToken = authHeader && authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

        // 2. Look for Local JWT in cookies (from your old custom login)
        const localToken = req.cookies.jwt;

        if (!firebaseToken && !localToken) {
            return res.status(401).json({ error: "Unauthorized - No token provided" });
        }

        let user;

        // --- PATH A: FIREBASE GOOGLE USER ---
        if (firebaseToken) {
            const decodedToken = await adminAuth.verifyIdToken(firebaseToken);
            user = await User.findOne({ firebaseUid: decodedToken.uid }).select("-password");

            // Auto-create if new Google user
            if (!user) {
                user = await User.create({
                    firebaseUid: decodedToken.uid,
                    fullName: decodedToken.name || "Google User",
                    username: decodedToken.email ? decodedToken.email.split("@")[0] : `user_${decodedToken.uid.slice(0, 5)}`,
                    profilePic: decodedToken.picture || "",
                    gender: "unspecified"
                });
            }
        } 
        // --- PATH B: LOCAL MONGODB USER ---
        else if (localToken) {
            const decoded = jwt.verify(localToken, process.env.JWT_SECRET);
            user = await User.findById(decoded.userId).select("-password");
        }

        if (!user) {
            return res.status(404).json({ error: "User not found in database" });
        }

        req.user = user;
        next();
    } catch (e) {
        console.log("Error in protectRoute middleware: ", e.message);
        res.status(401).json({ error: "Unauthorized - Authentication failed" });
    }
};

export default protectRoute;