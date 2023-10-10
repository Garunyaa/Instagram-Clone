import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const likeSchema = new mongoose.Schema({
  post_id: { type: ObjectId, ref: "Post" },
  user_id: { type: ObjectId, ref: "User" },
  status: { type: Number, default: 1 },
  created_at: { type: Date, default: Date.now() },
});

export const Like = mongoose.model("Like", likeSchema);
