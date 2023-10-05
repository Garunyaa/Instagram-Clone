const User = require("../models/user-model");
const { successResponse, errorResponse } = require("../middleware/response");

const followUser = async (req, res) => {
  try {
    const { userId, targetUserId } = req.body;
    const user = await User.findById(userId);
    const targetUser = await User.findById(targetUserId);

    if (!user || !targetUser) {
      return successResponse(res, 201, "User not found");
    }
    if (!user.followings.includes(targetUserId)) {
      user.followings.push(targetUserId);
      await user.save();

      targetUser.followers.push(userId);
      await targetUser.save();

      successResponse(
        res,
        201,
        `You are now following user with ID ${targetUserId}`
      );
    } else {
      successResponse(
        res,
        400,
        `You have already following user with ID ${targetUserId}`
      );
    }
  } catch (error) {
    console.error(error);
    errorResponse(res, 500, "Internal Server Error");
  }
};

const unfollowUser = async (req, res) => {
  try {
    const { userId, targetUserId } = req.body;
    const user = await User.findById(userId);
    const targetUser = await User.findById(targetUserId);
    if (!user) {
      errorResponse(res, 404, "User not found");
    }
    if (user.followings.includes(targetUserId)) {
      user.followings = user.followings.filter(
        (id) => id.toString() !== targetUserId.toString()
      );
      await user.save();

      targetUser.followers.pop(userId);
      await targetUser.save();

      successResponse(
        res,
        201,
        `You have unfollowed user with ID: ${targetUserId}`
      );
    } else {
      successResponse(
        res,
        400,
        `You have unfollowed user with ID: ${targetUserId}`
      );
    }
  } catch (error) {
    errorResponse(res, 500, "Internal Server Error");
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findOne({ name: req.body.name });
    successResponse(res, 200, user);
  } catch (error) {
    console.error(error);
    errorResponse(res, 500, "Internal Server Error");
  }
};

const updateUser = async (req, res) => {
  try {
    const existingUser = req.user;
    const { name, email, newPassword } = req.body;
    if (!existingUser) {
      errorResponse(res, 404, "User not found");
    }

    if (name) {
      existingUser.name = name;
    }
    if (email) {
      existingUser.email = email;
    }
    if (newPassword) {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      existingUser.password = hashedPassword;
    }

    await existingUser.save();

    successResponse(res, 200, "User profile updated successfully", user);
  } catch (error) {
    console.error(error);
    errorResponse(res, 500, "Internal Server Error");
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      errorResponse(res, 404, "User not found");
    }

    await User.findByIdAndDelete(user._id);

    successResponse(res, 200, "User account deleted successfully");
  } catch (error) {
    console.error(error);
    errorResponse(res, 500, "Internal Server Error");
  }
};

module.exports = {
  followUser,
  unfollowUser,
  getUser,
  updateUser,
  deleteUser,
};
