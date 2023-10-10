import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const commentSchema = new mongoose.Schema({
  description: { type: String, required: true },
  post_id: { type: ObjectId, ref: "Post" },
  user_id: { type: ObjectId, ref: "User" },
  status: { type: Number, default: 1 },
  created_at: { type: Date, default: Date.now() },
});

export const Comment = mongoose.model("Comment", commentSchema);
