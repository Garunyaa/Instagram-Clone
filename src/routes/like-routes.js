import express from "express";
import { likePost, unlikePost } from "../controllers/like-controller";

const router = express.Router();

router.post("/likepost/:id", likePost);
router.post("/unlike/:id", unlikePost);

export default router;
