import User from "../models/user.model.js";

export const getUsersForSidebar = async(req,res) => {
    try {

        const loggedInUsersId = req.user._id;
        const filteredUser = await User.find({_id: {$ne : loggedInUsersId}}).select("-password")    //{_id: {$ne : loggedInUsersId}} => it basically don't show our self in the chat

        res.status(200).json(filteredUser);
        
    } catch (e) {
        console.error("Error in getUsersForSidebar : ",e.message);
        res.status(500).json({ error : "Internal server error"})
    }
}

export const updateUserProfile = async (req, res) => {
	try {
		const { fullName, username, bio, profilePic } = req.body;
		const userId = req.user._id; // From your protectRoute middleware

		const user = await User.findById(userId);
		if (!user) return res.status(404).json({ error: "User not found" });

		// Update fields if they are provided in the request
		user.fullName = fullName || user.fullName;
		user.username = username || user.username;
		user.bio = bio || user.bio;
		user.profilePic = profilePic || user.profilePic;

		await user.save();

		res.status(200).json({
			_id: user._id,
			fullName: user.fullName,
			username: user.username,
			profilePic: user.profilePic,
			bio: user.bio,
		});
	} catch (error) {
		console.log("Error in updateUserProfile: ", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};