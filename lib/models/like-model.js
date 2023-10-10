"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Like = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var ObjectId = _mongoose["default"].Schema.Types.ObjectId;
var likeSchema = new _mongoose["default"].Schema({
  post_id: {
    type: ObjectId,
    ref: "Post"
  },
  user_id: {
    type: ObjectId,
    ref: "User"
  },
  created_at: {
    type: Date,
    "default": Date.now,
    status: {
      type: Number,
      "default": 1
    }
  }
});
var Like = exports.Like = _mongoose["default"].model("Like", likeSchema);
//# sourceMappingURL=like-model.js.map