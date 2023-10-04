const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const User = require("../models/user-model");

const dotenv = require("dotenv");
dotenv.config();

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!email || !password || !name) {
      res.status(400).json({ error: "Please fill all the fields" });
    }
    const savedUser = await User.findOne({ email: email });
    if (savedUser) {
      return res
        .status(400)
        .json({ error: "User already exists with this email" });
    }
    const authToken = await jwt.sign(req.body, process.env.SECRET_KEY);
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      auth_token: authToken,
    });

    await user.save();

    res.status(201).json({ message: "Saved successfully", user: user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ error: "Please add email or password" });
    }
    const savedUser = await User.findOne({ email: email });
    if (!savedUser) {
      res.status(401).json({ error: "Invalid email or password" });
    }
    const match = await bcrypt.compare(password, savedUser.password);
    if (match) {
      const token = jwt.sign({ _id: savedUser._id }, process.env.SECRET_KEY);
      res.status(200).json({ message: "Login Successful", token });
    } else {
      return res.status(401).json({ error: "Invalid email or password" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const otp = Math.floor(1000 + Math.random() * 9000);
    user.otp = otp;
    await user.save();

    const transporter = nodemailer.createTransport({
      // host: process.env.host,
      // port: process.env.port,
      service: "Gmail",
      auth: {
        user: process.env.user,
        pass: process.env.pass,
      },
      tls: { rejectUnauthorized: false },
    });
    const mailOptions = {
      from: "teddygks@gmail.com",
      to: user.email,
      subject: "Password reset",
      text: `Your OTP for reset password is ${otp}`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.status(500).send("Email could not be sent");
      } else {
        console.log("Email sent: " + info.response);
        res.status(200).send("Check your email for a password reset OTP");
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    const user = await User.findOne({ email, otp });
    if (!user) {
      return res.status(404).json({ error: "Invalid email or OTP" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.otp = null;
    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  signup,
  login,
  forgotPassword,
  resetPassword,
};
