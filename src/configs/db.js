import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDB = () =>
  mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("DB Connected Successfully");
    })
    .catch((error) => {
      console.log("Connection failed", error);
    });
