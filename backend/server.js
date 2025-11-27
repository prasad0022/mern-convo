import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectDB } from './config/connectDB.js'
import { userRouter } from './routes/user.route.js';
import { adminRouter } from './routes/admin.route.js';
import { messageRouter } from './routes/message.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"]
}));
app.use(express.json());
app.use(cookieParser());

app.use("/convo/admin", adminRouter);
app.use("/convo/user", userRouter);
app.use("/convo/message", messageRouter);

app.listen(PORT, async () => {
    await connectDB();
    console.log(`Server is running on port: ${PORT}`);
});