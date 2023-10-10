import express from "express";
import { connectDB } from "./configs/db";
import dotenv from "dotenv";
import authRoute from "./routes/auth-routes";
import userRoute from "./routes/user-routes";
import postRoute from "./routes/post-routes";
import commentRoute from "./routes/comment-routes";
import likeRoute from "./routes/like-routes";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectDB();

app.use("/api", authRoute);
app.use("/user", userRoute);
app.use("/post", postRoute);
app.use("/comment", commentRoute);
app.use("/like", likeRoute);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
