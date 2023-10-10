"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Comment = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var ObjectId = _mongoose["default"].Schema.Types.ObjectId;
var commentSchema = new _mongoose["default"].Schema({
  description: {
    type: String,
    required: true
  },
  post_id: {
    type: ObjectId,
    ref: "Post"
  },
  user_id: {
    type: ObjectId,
    ref: "User"
  },
  status: {
    type: Number,
    "default": 1
  }
}, {
  timestamps: true
});
var Comment = exports.Comment = _mongoose["default"].model("Comment", commentSchema);
//# sourceMappingURL=comment-model.js.map