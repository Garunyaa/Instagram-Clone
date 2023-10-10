import express from "express";
import { authenticateToken } from "../middleware/auth-middleware";
import {
  signup,
  login,
  forgotPassword,
  resetPassword,
} from "../controllers/auth-controller";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", authenticateToken, login);
router.post("/forgotpass", forgotPassword);
router.post("/resetpass", authenticateToken, resetPassword);

export default router;
