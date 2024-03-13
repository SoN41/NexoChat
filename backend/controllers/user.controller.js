import User from "../models/user.model.js";

export const getUsersForSidebar = async(req,res) => {
    try {

        const loggedInUsersId = req.user._id;
        const filteredUser = await User.find({_id: {$ne : loggedInUsersId}}).select("-password")    //{_id: {$ne : loggedInUsersId}} => it basically don't show our self in the chat

        res.status(200).json(filteredUser);
        
    } catch (e) {
        console.error("Error in getUsersForSidebar : ",e.message());
        res.status(500).json({ error : "Internal server error"})
    }
}