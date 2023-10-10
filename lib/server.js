"use strict";

var _express = _interopRequireDefault(require("express"));
var _db = require("./configs/db");
var _dotenv = _interopRequireDefault(require("dotenv"));
var _authRoutes = _interopRequireDefault(require("./routes/auth-routes"));
var _userRoutes = _interopRequireDefault(require("./routes/user-routes"));
var _postRoutes = _interopRequireDefault(require("./routes/post-routes"));
var _commentRoutes = _interopRequireDefault(require("./routes/comment-routes"));
var _likeRoutes = _interopRequireDefault(require("./routes/like-routes"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
_dotenv["default"].config();
var app = (0, _express["default"])();
var port = process.env.PORT;
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: true
}));
(0, _db.connectDB)();
app.use("/api", _authRoutes["default"]);
app.use("/user", _userRoutes["default"]);
app.use("/post", _postRoutes["default"]);
app.use("/comment", _commentRoutes["default"]);
app.use("/like", _likeRoutes["default"]);
app.listen(port, function () {
  console.log("Server running on port ".concat(port));
});
//# sourceMappingURL=server.js.map