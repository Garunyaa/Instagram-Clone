import express from "express";
import {
  createComment,
  getCommentsForPost,
  deleteComment,
} from "../controllers/comment-controller";

const router = express.Router();

router.post("/createcomment/:id", createComment);
router.get("/getcomments/:id", getCommentsForPost);
router.delete("/deletecomment/:id", deleteComment);

export default router;
