import { User } from "../model/user.model.js";
import jwt from 'jsonwebtoken';

export const userAuth = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        const { _id } = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await User.findById({ _id }).select("-password");
        if (!user) throw new Error("User not found!");

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ success: false, messsage: "AUTH ERROR: " + error });
    }
};