const express = require("express");
const authController = require("../controllers/auth-controller");
const userController = require("../controllers/user-controller");
const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/forgotpass", authController.forgotPassword);
router.post("/resetpass", authController.resetPassword);
router.post("/followuser", userController.followUser);
router.post("/unfollowuser", userController.unfollowUser);
router.get("/getuser", userController.getUser);

module.exports = router;
