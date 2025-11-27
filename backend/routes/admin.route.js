import express from 'express';
import { User } from "../model/user.model.js";

export const adminRouter = express.Router();

adminRouter.get("/allUsers", async (req, res) => {
    try {
        const { name, password } = req.body || {};

        if (!name || !password) return res.status(400).json({ success: false, message: "Please provide all the fields." });

        if (name !== "Prasad" || password !== process.env.ADMIN_PASSWORD) return res.status(400).json({ success: false, message: "Invalid credentials." });

        const allUsers = await User.find({});
        return res.status(200).json({ success: true, data: allUsers });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Error while fetching all users." });
    }
});