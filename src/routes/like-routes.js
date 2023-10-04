const express = require("express");
const router = express.Router();
const likeController = require("../controllers/like-controller");

router.post("/likepost/:id", likeController.likePost);
router.post("/unlike/:id", likeController.unlikePost);

module.exports = router;
