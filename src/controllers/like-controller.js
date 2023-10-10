import { Like } from "../models/like-model";
import { Post } from "../models/post-model";

import { successResponse, errorResponse } from "../middleware/response";

export const likePost = async (req, res) => {
  try {
    const post_id = req.params.id;
    const { user_id } = req.body;

    const post = await Post.findById(post_id);
    if (!post) {
      return errorResponse(res, 404, "Post not found");
    }

    const existingLike = await Like.findOne({ post_id, user_id });
    if (existingLike) {
      return successResponse(res, 400, "You have already liked this post");
    }

    await Post.findByIdAndUpdate(post_id, { $inc: { likes_count: 1 } });

    const newLike = new Like({
      post_id,
      user_id,
    });

    await newLike.save();

    return successResponse(res, 201, "Post liked");
  } catch (error) {
    console.error(error);
    return errorResponse(res, 500, "Internal Server Error");
  }
};

export const unlikePost = async (req, res) => {
  try {
    const post_id = req.params.id;
    const { user_id } = req.body;

    const post = await Post.findById(post_id);
    if (!post) {
      return errorResponse(res, 404, "Post not found");
    }
    const existingLike = await Like.findOne({ post_id, user_id });

    if (!existingLike) {
      return successResponse(res, 400, "You have not liked this post");
    }

    await Post.findByIdAndUpdate(post_id, { $inc: { likes_count: -1 } });

    await Like.findByIdAndRemove(existingLike);

    return successResponse(res, 200, "Post unliked");
  } catch (error) {
    console.error(error);
    return errorResponse(res, 500, "Internal Server Error");
  }
};
