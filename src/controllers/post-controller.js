const Post = require("../models/post-model");
const User = require("../models/user-model");
const { successResponse, errorResponse } = require("../middleware/response");

const createPost = async (req, res) => {
  const { file, file_type, description, tags, user_id } = req.body;
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      errorResponse(res, 404, "User not found");
    }
    const newPost = new Post({
      file,
      file_type,
      description,
      tags,
      user_id,
    });

    await newPost.save();

    successResponse(res, 201, newPost);
  } catch (error) {
    errorResponse(res, 500, error);
  }
};

const updatePost = async (req, res) => {
  const { description, tags } = req.body;
  try {
    const existingPost = await Post.findById(req.params.id);
    if (!existingPost) {
      errorResponse(res, 404, "Post not found");
    }
    existingPost.description = description || existingPost.description;
    existingPost.tags = tags || existingPost.tags;

    await existingPost.save();

    successResponse(res, 200, existingPost);
  } catch (error) {
    console.error(error);
    errorResponse(res, 500, "Internal Server Error");
  }
};

const deletePost = async (req, res) => {
  try {
    const existingPost = await Post.findByIdAndDelete(req.params.id);
    if (!existingPost) {
      errorResponse(res, 404, "Post not found");
    } else {
      successResponse(res, 204, "Post deleted");
    }
  } catch (error) {
    console.error(error);
    errorResponse(res, 500, "Internal Server Error");
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("user_id", "name");
    successResponse(res, 200, posts);
  } catch (error) {
    console.error(error);
    errorResponse(res, 500, "Internal Server Error");
  }
};

module.exports = {
  createPost,
  updatePost,
  deletePost,
  getAllPosts,
};
