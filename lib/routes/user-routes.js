"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _authMiddleware = require("../middleware/auth-middleware");
var _userController = require("../controllers/user-controller");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
router.post("/followuser", _userController.followUser);
router.post("/unfollowuser", _userController.unfollowUser);
router.get("/getuser", _userController.getUser);
router.put("/updateuser", _authMiddleware.authenticateToken, _userController.updateUser);
router["delete"]("/deleteuser", _authMiddleware.authenticateToken, _userController.deleteUser);
var _default = exports["default"] = router;
//# sourceMappingURL=user-routes.js.map