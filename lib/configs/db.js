"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connectDB = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _dotenv = _interopRequireDefault(require("dotenv"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
_dotenv["default"].config();
var connectDB = exports.connectDB = function connectDB() {
  return _mongoose["default"].connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(function () {
    console.log("DB Connected Successfully");
  })["catch"](function (error) {
    console.log("Connection failed", error);
  });
};
//# sourceMappingURL=db.js.map