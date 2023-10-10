"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _commentController = require("../controllers/comment-controller");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
router.post("/createcomment/:id", _commentController.createComment);
router.get("/getcomments/:id", _commentController.getCommentsForPost);
router["delete"]("/deletecomment/:id", _commentController.deleteComment);
var _default = exports["default"] = router;
//# sourceMappingURL=comment-routes.js.map