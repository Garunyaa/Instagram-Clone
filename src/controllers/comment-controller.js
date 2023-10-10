import { Comment } from "../models/comment-model";
import { Post } from "../models/post-model";
import { successResponse, errorResponse } from "../middleware/response";

export const createComment = async (req, res) => {
  try {
    const postId = req.params.id;
    const { description, user_id } = req.body;
    const post = await Post.findById(postId);
    if (!post) {
      errorResponse(res, 404, "Post not found");
    }
    const newComment = new Comment({
      description,
      post_id: postId,
      user_id,
    });

    post.comments_count += 1;

    await newComment.save();
    await post.save();

    successResponse(res, 201, "Comment created");
  } catch (error) {
    console.error(error);
    errorResponse(res, 500, "Internal Server Error");
  }
};

export const getCommentsForPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return errorResponse(res, 404, "Post not found");
    }
    const comments = await Comment.find({ post_id: req.params.id }).select({
      "description": 1,
      "user_id": 1,
    });
    return successResponse(res, 200, { comments });
  } catch (error) {
    console.error(error);
    return errorResponse(res, 500, "Internal Server Error");
  }
};

export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findOneAndDelete(req.params.id);
    if (!comment) {
      errorResponse(res, 404, "Comment not found");
    } else {
      successResponse(res, 200, "Comment deleted");
    }
  } catch (error) {
    console.error(error);
    errorResponse(res, 500, "Internal Server Error");
  }
};
