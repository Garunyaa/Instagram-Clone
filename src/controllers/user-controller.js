import bcrypt from "bcrypt";
import { User } from "../models/user-model";
import { successResponse, errorResponse } from "../middleware/response";

// follow user

export const followUser = async (req, res) => {
  try {
    const { user_id, target_userId } = req.body;
    const user = await User.findById(user_id);
    const targetUser = await User.findById(target_userId);

    if (!user || !targetUser) {
      return errorResponse(res, 400, "User not found");
    }

    if (user_id === target_userId) {
      return errorResponse(res, 400, "You can't follow yourself");
    }

    if (user.followings.includes(target_userId)) {
      return successResponse(
        res,
        400,
        `You have already followed user with ID ${target_userId}`
      );
    }

    user.followings.push(target_userId);
    targetUser.followers.push(user_id);

    const updateUser = await User.findByIdAndUpdate(
      user_id,
      { followings: user.followings },
      { new: true }
    );

    const updateTargetUser = await User.findByIdAndUpdate(
      target_userId,
      { followers: targetUser.followers },
      { new: true }
    );

    if (updateUser && updateTargetUser) {
      return successResponse(
        res,
        201,
        `You are now following user with ID ${target_userId}`
      );
    } else {
      return errorResponse(
        res,
        400,
        `Failed to follow user with ID ${target_userId}`
      );
    }
  } catch (error) {
    console.error(error);
    return errorResponse(res, 500, "Internal Server Error");
  }
};

// unfollow user

export const unfollowUser = async (req, res) => {
  try {
    const { user_id, target_userId } = req.body;
    const user = await User.findById(user_id);
    const targetUser = await User.findById(target_userId);

    if (!user || !targetUser) {
      return errorResponse(res, 400, "User not found");
    }

    if (!user.followings.includes(target_userId)) {
      return successResponse(
        res,
        400,
        `You are not following user with ID ${target_userId}`
      );
    }

    if (user.followings.includes(target_userId)) {
      user.followings.pop(target_userId);

      const updateUser = await User.findByIdAndUpdate(
        user_id,
        { followings: user.followings },
        { new: true }
      );

      if (targetUser.followers.includes(user_id)) {
        targetUser.followers.pop(user_id);

        const updateTargetUser = await User.findByIdAndUpdate(
          target_userId,
          { followers: targetUser.followers },
          { new: true }
        );

        if (updateUser && updateTargetUser) {
          return successResponse(
            res,
            201,
            `You have unfollowed user with ID: ${target_userId}`
          );
        } else {
          return errorResponse(
            res,
            400,
            `Failed to unfollow user with ID: ${target_userId}`
          );
        }
      } else {
        return errorResponse(
          res,
          400,
          `You have already unfollowed user with ID: ${target_userId}`
        );
      }
    }
  } catch (error) {
    return errorResponse(res, 500, "Internal Server Error");
  }
};

//get user

export const getUser = async (req, res) => {
  try {
    const user = await User.findOne(req.params.id);
    if (!user) {
      return errorResponse(res, 400, "User not found");
    }
    successResponse(res, 200, { user });
  } catch (error) {
    console.error(error);
    errorResponse(res, 500, "Internal Server Error");
  }
};

// update user

export const updateUser = async (req, res) => {
  try {
    const existingUser = await User.findById(req.params.id);

    if (!existingUser) {
      return errorResponse(res, 404, "User not found");
    }

    const { name, email, new_password } = req.body;

    const updatedFields = {};

    if (name) {
      updatedFields.name = name;
    }
    if (email) {
      updatedFields.email = email;
    }
    if (new_password) {
      const hashedPassword = await bcrypt.hash(new_password, 10);
      updatedFields.password = hashedPassword;
    }

    const updatedUser = await User.findByIdAndUpdate(
      existingUser._id,
      updatedFields,
      { new: true }
    );

    if (updatedUser) {
      return successResponse(res, 200, "User profile updated successfully");
    } else {
      return errorResponse(res, 400, "Failed to update user profile");
    }
  } catch (error) {
    console.error(error);
    return errorResponse(res, 500, "Internal Server Error");
  }
};

// delete user

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return errorResponse(res, 404, "User not found");
    }

    const deletedUser = await User.findByIdAndDelete(user._id);

    if (deletedUser) {
      return successResponse(res, 200, "User account deleted successfully");
    } else {
      return errorResponse(res, 400, "Failed to delete user account");
    }
  } catch (error) {
    console.error(error);
    return errorResponse(res, 500, "Internal Server Error");
  }
};
