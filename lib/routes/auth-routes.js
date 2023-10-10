"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _authMiddleware = require("../middleware/auth-middleware");
var _authController = require("../controllers/auth-controller");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
router.post("/signup", _authController.signup);
router.post("/login", _authMiddleware.authenticateToken, _authController.login);
router.post("/forgotpass", _authController.forgotPassword);
router.post("/resetpass", _authMiddleware.authenticateToken, _authController.resetPassword);
var _default = exports["default"] = router;
//# sourceMappingURL=auth-routes.js.map