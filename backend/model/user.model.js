import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profilePhoto: {
        type: String,
        default: "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG.png"
    },
    gender: {
        type: String,
        enum: ["male", "female"],
        required: true
    }
}, { timestamps: true });

userSchema.methods.validatePassword = async function (inputPassword) {
    const user = this;
    return await bcrypt.compare(inputPassword, user.password);
}

userSchema.methods.getJWT = function () {
    const user = this;
    return jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });
}

export const User = mongoose.model("User", userSchema);