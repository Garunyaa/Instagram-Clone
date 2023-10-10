import express from "express";
import { authenticateToken } from "../middleware/auth-middleware";
import {
  followUser,
  unfollowUser,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/user-controller";
const router = express.Router();

router.post("/followuser", followUser);
router.post("/unfollowuser", unfollowUser);
router.get("/getuser/:_id", getUser);
router.patch("/updateuser/:id", authenticateToken, updateUser);
router.delete("/deleteuser/:id", authenticateToken, deleteUser);

export default router;
