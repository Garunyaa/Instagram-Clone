const express = require("express");
const connectDB = require("./src/configs/db");
const dotenv = require("dotenv");
const userRoute = require("./src/routes/user-routes");
const postRoute = require("./src/routes/post-routes");
const commentRoute = require("./src/routes/comment-routes");
const likeRoute = require("./src/routes/like-routes");

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectDB();

app.use("/api", userRoute);
app.use("/post", postRoute);
app.use("/comment", commentRoute);
app.use("/like", likeRoute);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
