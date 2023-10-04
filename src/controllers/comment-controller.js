const Comment = require("../models/comment-model");
const Post = require("../models/post-model");
require("../models/user-model");

const createComment = async (req, res) => {
  try {
    const postId = req.params.id;
    const { description, user_id } = req.body;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    const newComment = new Comment({
      description,
      post_id: postId,
      user_id,
    });

    post.comments_count += 1;

    await newComment.save();
    await post.save();
    
    res.status(201).json({ message: "Comment created", comment: newComment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getCommentsForPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    const comments = await Comment.find({ post: req.params.id }).populate(
      "user_id",
      "name"
    );
    res.status(200).json({ comments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findOneAndDelete(req.params.id);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    } else {
      return res.status(200).json({ message: "Comment deleted" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createComment,
  getCommentsForPost,
  deleteComment,
};
