const Like = require("../models/like-model");
const Post = require("../models/post-model");
const User = require("../models/user-model");

const likePost = async (req, res) => {
  try {
    const post_id = req.params.id;
    const { user_id } = req.body;

    const post = await Post.findById(post_id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const existingLike = await Like.findOne({ post: post_id, user_id });
    if (existingLike) {
      return res
        .status(400)
        .json({ message: "You have already liked this post" });
    }

    const newLike = new Like({
      post: post_id,
      user_id,
    });

    post.likes_count += 1;

    await newLike.save();
    await post.save();

    res.status(201).json({ message: "Post liked" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const unlikePost = async (req, res) => {
  try {
    const post_id = req.params.id;
    const { user_id } = req.body;

    const post = await Post.findById(post_id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    const existingLike = await Like.findOne({ post: post_id, user_id });

    if (existingLike) {
      return res.status(400).json({ message: "You have not liked this post" });
    }

    post.likes_count -= 1;

    // await existingLike.save();
    await post.save();

    await Like.findByIdAndRemove(existingLike);

    res.status(200).json({ message: "Post unliked" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  likePost,
  unlikePost,
};
