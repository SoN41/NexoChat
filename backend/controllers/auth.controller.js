import bcrypt from 'bcryptjs';
import User from "../models/user.model.js";
import generateTokenandSetCookie from '../utils/generateTokens.js';

export const signup = async (req, res) => {
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ erro: "passwords don't match" })
        }

        const user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ erro: "user already exists" });
        }

        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        // https://avatar-placeholder.iran.liara.run/

        // const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
        // const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

        const profilePic = `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`;

        const newUser = new User({
            fullName,
            username,
            password: hashedPassword,
            gender,
            // profilePic: gender === "male" ? boyProfilePic : girlProfilePic
            profilePic
        })

        if (newUser) {
            generateTokenandSetCookie(newUser._id , res);
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                profilePic: newUser.profilePic,
            })
        }
        else{
            res.status(400).json({ error: "Invalid user data" })
        }

    } catch (e) {
        console.log("Error in Signup Controler : ", e.message);
        res.status(500).json({ error: "Internal server error" })
    }
}

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        // 1. MUST USE 'return' HERE
        if (!user) {
            return res.status(400).json({ error: "Invalid username" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        // 2. MUST USE 'return' HERE
        if (!isPasswordCorrect) {
            return res.status(400).json({ error: "Invalid password" });
        }

        // Generate token and send final response
        generateTokenandSetCookie(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic,
        });

    } catch (error) {
        console.log("Error in login controller", error.message);
        // 3. Ensure this only runs if no other response was sent
        if (!res.headersSent) {
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
};

export const logout = (req, res) => {
    try {
        res.cookie("jwt" , "" , {maxAge : 0})
        res.status(200).json({message : "logged out successfully"})
    } catch (e) {
        console.log("Error in logout Controler : ", e.message);
        res.status(500).json({ error: "Internal server error" })
    }
}
