const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const User = require("../models/user-model");
const { successResponse, errorResponse } = require("../middleware/response");
const sendMail = require("../services/send-email");

const dotenv = require("dotenv");
dotenv.config();

const signup = async (req, res) => {
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

    successResponse(res, 201, "Saved successfully", user);
  } catch (error) {
    errorResponse(res, 400, error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      errorResponse(res, 400, "Please add email or password");
    }
    const savedUser = await User.findOne({ email: email });
    if (!savedUser) {
      errorResponse(res, 401, "Invalid email or password");
    }
    const match = await bcrypt.compare(password, savedUser.password);
    if (match) {
      successResponse(res, 200, "Login Successful");
    } else {
      errorResponse(res, 401, "Invalid email or password");
    }
  } catch (error) {
    console.error(error);
    errorResponse(res, 500, "Internal Server Error");
  }
};

const forgotPassword = async (req, res) => {
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

    await sendMail(user.email, subject, text);
    successResponse(res, 200, "Check your email for a password reset OTP");
  } catch (error) {
    console.error(error);
    errorResponse(res, 500, "Internal Server Error");
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    const user = await User.findOne({ email, otp });
    if (!user) {
      errorResponse(res, 404, "Invalid email or OTP");
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.otp = null;
    await user.save();

    successResponse(res, 200, "Password reset successful");
  } catch (error) {
    console.error(error);
    errorResponse(res, 500, "Internal Server Error");
  }
};

module.exports = {
  signup,
  login,
  forgotPassword,
  resetPassword,
};
