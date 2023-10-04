const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const postSchema = new mongoose.Schema(
  {
    file: { type: String },
    file_type: { type: Number },
    description: { type: String },
    tags: { type: Array, default: [] },
    likes_count: { type: Number, default: 0 },
    comments_count: { type: Number, default: 0 },
    user_id: { type: ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
