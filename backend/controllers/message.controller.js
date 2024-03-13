import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async(req,res) => {
    try {
        const {message} = req.body;
        const {id : reciverId} = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants:{$all :[senderId , reciverId]},
        })

        if(!conversation){
            conversation = await Conversation.create({
                participants:[senderId , reciverId],
            })
        }

        const newMessage = new Message({
            senderId,
            reciverId,
            message,
        })

        if(newMessage){
            conversation.messages.push(newMessage._id);
        }
        
        // This will run perallel
        await Promise.all([conversation.save() , newMessage.save()]);
        res.status(201).json(newMessage)
        
    } catch (e) {
        console.log("Error in send message controller : ",e.message);
        res.status(500).json({error:"Internal server error"})
    }
}

export const getMessages = async(req,res) => {
    try {
        const {id:userToChatId} = req.params;
        const senderId = req.user._id;
        const conversation = await Conversation.findOne({
            participants:{$all :[senderId , userToChatId]},
        }).populate("messages");    //not refrence but message itself

        if(!conversation) return res.status(200).json([]);

        const messages = conversation.messages;

        res.status(200).json(messages);
    } catch (e) {
        console.log("Error in send message controller : ",e.message);
        res.status(500).json({error:"Internal server error"})
    }
}