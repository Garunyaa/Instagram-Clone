const express = require("express");
const postController = require("../controllers/post-controller");
const router = express.Router();

router.post("/createpost/:id", postController.createPost);
router.put("/updatepost/:id", postController.updatePost);
router.delete("/deletepost/:id", postController.deletePost);
router.get("/getAllPosts", postController.getAllPosts);

module.exports = router;
