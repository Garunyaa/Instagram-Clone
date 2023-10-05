const express = require("express");
const authenticateToken = require("../middleware/auth-middleware");
const authController = require("../controllers/auth-controller");
const userController = require("../controllers/user-controller");
const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authenticateToken, authController.login);
router.post("/forgotpass", authController.forgotPassword);
router.post("/resetpass", authenticateToken, authController.resetPassword);
router.post("/followuser", userController.followUser);
router.post("/unfollowuser", userController.unfollowUser);
router.get("/getuser", userController.getUser);
router.put("/updateuser", authenticateToken, userController.updateUser);
router.delete("/deleteuser", authenticateToken, userController.deleteUser);

module.exports = router;
