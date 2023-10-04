const express = require("express");
const router = express.Router();
const commentController = require("../controllers/comment-controller");

router.post("/createcomment/:id", commentController.createComment);
router.get("/getcomments/:id", commentController.getCommentsForPost);
router.delete("/deletecomment/:id", commentController.deleteComment);

module.exports = router;
