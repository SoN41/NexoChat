import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    reciverId: { // Keeping your original spelling here
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    message: {
        type: String,
        default: "" // Removed required: true so users can send just an image
    },
    image: {
        type: String,
        default: "" // This will store the secure URL from Cloudinary
    }
}, { timestamps: true }); // timestamps adds createdAt and updatedAt

const Message = mongoose.model("Message", messageSchema);

export default Message;