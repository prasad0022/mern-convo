import express from 'express';
import { Message } from '../model/message.model.js';
import { Conversation } from '../model/conversation.model.js'
import { userAuth } from '../middlewares/userAuth.js';
import { User } from '../model/user.model.js';

export const messageRouter = express.Router();

messageRouter.post("/send/:id", userAuth, async (req, res) => {
    try {
        const senderId = req.user._id;
        const receiverId = req.params.id;
        const { message } = req.body || {};

        if (!message) return res.status(400).json({ success: false, message: "Please provide a message." });

        if (receiverId.toString() === senderId.toString()) return res.status(400).json({ success: false, message: "Can't sned message to yourself." });

        const receiver = await User.findById({ _id: receiverId });
        if (!receiver) return res.status(404).json({ success: false, message: "Receiver not found." });

        let gotConversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        });

        if (!gotConversation) {
            gotConversation = await Conversation.create({
                participants: [senderId, receiverId],
                messages: []
            });
        };

        const newMessage = await Message.create({
            senderId, receiverId, message
        });

        if (newMessage) {
            gotConversation.messages.push(newMessage._id);
        };

        await Promise.all([gotConversation.save(), newMessage.save()]);

        return res.status(201).json({ success: true, message: "Message sent.", data: message });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Error while sending message." });
    }
});

messageRouter.get("/:id", userAuth, async (req, res) => {
    try {
        const senderId = req.user._id;
        const receiverId = req.params.id;
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        }).populate("messages");
        if (!conversation) return res.status(404).json({ success: false, message: "No conversation found." });
        return res.status(200).json({ success: true, data: conversation?.messages });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Error while fetching conversation." });
    }
});