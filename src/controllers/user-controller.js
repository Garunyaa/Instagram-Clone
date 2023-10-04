const User = require("../models/user-model");

const followUser = async (req, res) => {
  try {
    const { userId, targetUserId } = req.body;
    const user = await User.findById(userId);
    const targetUser = await User.findById(targetUserId);

    if (!user || !targetUser) {
      return res.status(404).json({ error: "User not found" });
    }
    if (!user.followings.includes(targetUserId)) {
      user.followings.push(targetUserId);
      await user.save();

      targetUser.followers.push(userId);
      await targetUser.save();

      res.status(201).json({
        message: `You are now following user with ID ${targetUserId}`,
      });
    } else {
      res.status(400).json({
        message: `You are already following user with ID ${targetUserId}`,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const unfollowUser = async (req, res) => {
  try {
    const { userId, targetUserId } = req.body;
    const user = await User.findById(userId);
    const targetUser = await User.findById(targetUserId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (user.followings.includes(targetUserId)) {
      user.followings = user.followings.filter(
        (id) => id.toString() !== targetUserId.toString()
      );
      await user.save();

      targetUser.followers.pop(userId);
      await targetUser.save();

      return res
        .status(201)
        .json({ message: `You have unfollowed user with ID: ${targetUserId}` });
    } else {
      return res
        .status(400)
        .json({ message: `You have unfollowed user with ID: ${targetUserId}` });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findOne({ name: req.body.name });
    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  followUser,
  unfollowUser,
  getUser,
};
