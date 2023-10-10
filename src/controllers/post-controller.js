import { Post } from "../models/post-model";
import { User } from "../models/user-model";
import { successResponse, errorResponse } from "../middleware/response";

export const createPost = async (req, res) => {
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

    successResponse(res, 201, "Post created");
  } catch (error) {
    errorResponse(res, 500, "Internal Server Error");
  }
};

export const updatePost = async (req, res) => {
  const { description, tags } = req.body;
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      {
        description: description || undefined,
        tags: tags || undefined,
      },
      {
        new: true,
      }
    );
    if (!updatedPost) {
      errorResponse(res, 404, "Post not found");
      return;
    }

    successResponse(res, 200, "Post updated");
  } catch (error) {
    console.error(error);
    errorResponse(res, 500, "Internal Server Error");
  }
};

export const deletePost = async (req, res) => {
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

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("user_id", "name");
    successResponse(res, 200, posts);
  } catch (error) {
    console.error(error);
    errorResponse(res, 500, "Internal Server Error");
  }
};
