const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const commentSchema = new mongoose.Schema(
  {
    description: { type: String, required: true },
    post_id: { type: ObjectId, ref: "Post" },
    user_id: { type: ObjectId, ref: "User" },
    status: { type: Number, default: 1 },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
