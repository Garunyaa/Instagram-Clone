"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _postController = require("../controllers/post-controller");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
router.post("/createpost/:id", _postController.createPost);
router.put("/updatepost/:id", _postController.updatePost);
router["delete"]("/deletepost/:id", _postController.deletePost);
router.get("/getAllPosts", _postController.getAllPosts);
var _default = exports["default"] = router;
//# sourceMappingURL=post-routes.js.map