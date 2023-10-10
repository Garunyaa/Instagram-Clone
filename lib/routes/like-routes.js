"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _likeController = require("../controllers/like-controller");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
router.post("/likepost/:id", _likeController.likePost);
router.post("/unlike/:id", _likeController.unlikePost);
var _default = exports["default"] = router;
//# sourceMappingURL=like-routes.js.map