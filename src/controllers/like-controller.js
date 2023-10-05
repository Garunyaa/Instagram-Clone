const Like = require("../models/like-model");
const Post = require("../models/post-model");
const User = require("../models/user-model");
const { successResponse, errorResponse } = require("../middleware/response");

const likePost = async (req, res) => {
  try {
    const post_id = req.params.id;
    const { user_id } = req.body;

    const post = await Post.findById(post_id);
    if (!post) {
      errorResponse(res, 404, "Post not found");
    }

    const existingLike = await Like.findOne({ post: post_id, user_id });
    if (existingLike) {
      successResponse(res, 400, "You have already liked this post");
    }

    const newLike = new Like({
      post: post_id,
      user_id,
    });

    post.likes_count += 1;

    await newLike.save();
    await post.save();

    successResponse(res, 201, "Post liked");
  } catch (error) {
    console.error(error);
    errorResponse(res, 500, "Internal Server Error");
  }
};

const unlikePost = async (req, res) => {
  try {
    const post_id = req.params.id;
    const { user_id } = req.body;

    const post = await Post.findById(post_id);
    if (!post) {
      successResponse(res, 404, "Post not found");
    }
    const existingLike = await Like.findOne({ post: post_id, user_id });

    if (existingLike) {
      successResponse(res, 400, "You have not liked this post");
    }

    post.likes_count -= 1;

    await post.save();

    await Like.findByIdAndRemove(existingLike);

    successResponse(res, 200, "Post unliked");
  } catch (error) {
    console.error(error);
    errorResponse(res, 500, "Internal Server Error");
  }
};

module.exports = {
  likePost,
  unlikePost,
};
