const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const likeSchema = new mongoose.Schema({
  post_id: { type: ObjectId, ref: "Post" },
  user_id: { type: ObjectId, ref: "User" },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Like = mongoose.model("Like", likeSchema);

module.exports = Like;
