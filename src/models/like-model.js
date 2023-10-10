import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const likeSchema = new mongoose.Schema({
  post_id: { type: ObjectId, ref: "Post" },
  user_id: { type: ObjectId, ref: "User" },
  created_at: {
    type: Date,
    default: Date.now,
    status: { type: Number, default: 1 },
  },
});

export const Like = mongoose.model("Like", likeSchema);
