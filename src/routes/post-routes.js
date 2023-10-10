import express from "express";
import {
  createPost,
  updatePost,
  deletePost,
  getAllPosts,
} from "../controllers/post-controller";
const router = express.Router();

router.post("/createpost/:id", createPost);
router.patch("/updatepost/:id", updatePost);
router.delete("/deletepost/:id", deletePost);
router.get("/getAllPosts", getAllPosts);

export default router;
