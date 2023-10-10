import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/user-model";
import { successResponse, errorResponse } from "../middleware/response";
import { mailSender } from "../services/send-email";
import dotenv from "dotenv";
dotenv.config();

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!email || !password || !name) {
      errorResponse(res, 400, "Please fill all the fields");
    }
    const savedUser = await User.findOne({ email: email });
    if (savedUser) {
      errorResponse(res, 400, "User already exists with this email");
    }
    const authToken = jwt.sign(req.body, process.env.SECRET_KEY);
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      auth_token: authToken,
    });

    await user.save();

    successResponse(res, 201, "Saved successfully");
  } catch (error) {
    errorResponse(res, 500, "Internal Server Error");
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      errorResponse(res, 400, "Please add email or password");
    }
    const savedUser = await User.findOne({ email: email });
    if (!savedUser) {
      errorResponse(res, 401, "Invalid email or password");
    }
    const passwordMatch = await bcrypt.compare(password, savedUser.password);
    if (passwordMatch) {
      successResponse(res, 200, "Login Successful");
    } else {
      errorResponse(res, 401, "Invalid email or password");
    }
  } catch (error) {
    console.error(error);
    errorResponse(res, 500, "Internal Server Error");
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      errorResponse(res, 404, "User not found");
    }
    const otp = Math.floor(1000 + Math.random() * 9000);
    user.otp = otp;
    await user.save();

    const subject = "Password reset";
    const text = `Your OTP for reset password is ${otp}`;

    await mailSender(user.email, subject, text);
    successResponse(res, 200, `OTP generated successfully, ${otp}`);
  } catch (error) {
    console.error(error);
    errorResponse(res, 500, "Internal Server Error");
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, otp, new_password } = req.body;
    const user = await User.findOne({ email, otp });
    if (!user) {
      errorResponse(res, 404, "Invalid email or OTP");
    }
    const hashedPassword = await bcrypt.hash(new_password, 10);
    user.password = hashedPassword;
    user.otp = null;
    await user.save();

    successResponse(res, 200, "Password reset successful");
  } catch (error) {
    console.error(error);
    errorResponse(res, 500, "Internal Server Error");
  }
};
