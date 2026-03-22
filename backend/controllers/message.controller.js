import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";
import cloudinary from "../config/cloudinary.js";

// message.controller.js

export const sendMessage = async (req, res) => {
    try {
        // ✅ FIX 1: Destructure what MessageInput.jsx actually sends
        const { text, image } = req.body;
        const { id: reciverId } = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, reciverId] },
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, reciverId],
            });
        }

        // ✅ FIX 2: If you use Cloudinary, upload here before saving
        let imageUrl = "";
        if (image) {
            const uploadedResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadedResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            reciverId,
            // ✅ FIX 3: Use the correctly named variables
            message: text || "",
            image: imageUrl || "",
        });

        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }

        await Promise.all([conversation.save(), newMessage.save()]);

        const receiverSocketId = getReceiverSocketId(reciverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        res.status(201).json(newMessage);

    } catch (e) {
        console.log("Error in send message controller : ", e.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const senderId = req.user._id;
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] },
        }).populate("messages");    //not refrence but message itself

        if (!conversation) return res.status(200).json([]);

        const messages = conversation.messages;

        res.status(200).json(messages);
    } catch (e) {
        console.log("Error in send message controller : ", e.message);
        res.status(500).json({ error: "Internal server error" })
    }
}