import express from 'express';
import bcrypt from 'bcrypt';
import { User } from '../model/user.model.js';
import { userAuth } from '../middlewares/userAuth.js';

export const userRouter = express.Router();

userRouter.post("/signup", async (req, res) => {
    try {
        const userData = req.body;

        if (!userData || Object.keys(userData).length === 0) {
            return res.status(400).json({ success: false, message: "Request body is empty" })
        }

        const { fullName, userName, password, confirmPassword, gender } = userData;

        if (fullName && userName && password && confirmPassword && gender) {

            // Unique User name:
            const user = await User.findOne({ userName });
            if (user) return res.status(400).json({ success: false, message: "User name already exist. Please try again" });

            // Valid Password:
            if (password !== confirmPassword) return res.status(400).json({ success: false, message: "Password do not match" });

            // Valid Gender:
            if (!["male", "female"].includes(gender)) return res.status(400).json({ success: false, message: "Invalid gender: Should be male or female" });

            // Hash password:
            const hashPassword = await bcrypt.hash(password, 10);

            // profilePhoto
            const maleProfilePhoto = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
            const femaleProfilePhoto = `https://avatar.iran.liara.run/public/girl?username=${userName}`;

            // Create new user:
            const newUser = new User({
                fullName,
                userName,
                password: hashPassword,
                profilePhoto: (gender === "male") ? maleProfilePhoto : femaleProfilePhoto,
                gender
            });

            await newUser.save();
            return res.status(201).json({ success: true, message: "Account created successfully." })

        } else {
            return res.status(400).json({ success: false, message: "Please provide all the fields" })
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Error while creating the account" });
    }
});

userRouter.post("/login", async (req, res) => {
    try {
        const { userName, password } = req.body || {};

        if (!userName || !password) return res.status(400).json({ success: false, message: "Please provide all the fields." });
        // Valid user:
        const user = await User.findOne({ userName });
        if (!user) return res.status(400).json({ success: false, message: "Invalid credentials." });
        // Valid password:
        const isValidPassword = await user.validatePassword(password);
        if (!isValidPassword) return res.status(400).json({ success: false, message: "Invalid credentials." });

        // Remove password before sending Response:
        user.password = undefined;

        // Get JWT Token:
        const JWT = user.getJWT();
        res.cookie("token", JWT);
        return res.status(200).json({ success: true, message: "Login successful", data: user });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Error while logging you in." });
    }
});

userRouter.post("/logout", (req, res) => {
    try {
        return res.status(200)
            .cookie("token", null, { expires: new Date(Date.now()) })
            .json({ success: true, message: "Logout successful." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Error while logging you out." });
    }
});

userRouter.post("/getOtherUsers", userAuth, async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const allUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

        if (!allUsers) return res.status(200).json({ message: "No users found!" });

        return res.status(200).json({ success: true, data: allUsers });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Error while fecthing all users." })
    }
});

userRouter.get("/profile", userAuth, (req, res) => {
    try {
        const user = req.user;
        return res.status(200).json({ success: true, data: user });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ success: false, message: "Error while user info." });
    }
})