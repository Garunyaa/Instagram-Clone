const Post = require("../models/post-model");
const User = require("../models/user-model");

const createPost = async (req, res) => {
  const { file, file_type, description, tags, user_id } = req.body;
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const newPost = new Post({
      file,
      file_type,
      description,
      tags,
      user_id,
    });
    await newPost.save();

    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updatePost = async (req, res) => {
  const { description, tags } = req.body;
  try {
    const existingPost = await Post.findById(req.params.id);
    if (!existingPost) {
      return res.status(404).json({ error: "Post not found" });
    }
    existingPost.description = description || existingPost.description;
    existingPost.tags = tags || existingPost.tags;

    await existingPost.save();

    res.status(200).json({ existingPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deletePost = async (req, res) => {
  try {
    const existingPost = await Post.findByIdAndDelete(req.params.id);
    if (!existingPost) {
      return res.status(404).json({ error: "Post not found" });
    } else {
      return res.status(204).json({ message: "Post deleted" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("user_id", "name");
    res.status(200).json({ posts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  createPost,
  updatePost,
  deletePost,
  getAllPosts,
};
