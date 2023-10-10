import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true, min: 6 },
    otp: { type: String },
    auth_token: { type: String },
    followers: { type: Array, default: [] },
    followings: { type: Array, default: [] },
    status: { type: Number, default: 1 },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
