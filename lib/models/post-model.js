"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Post = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var ObjectId = _mongoose["default"].Schema.Types.ObjectId;
var postSchema = new _mongoose["default"].Schema({
  file: {
    type: String
  },
  file_type: {
    type: Number
  },
  description: {
    type: String
  },
  tags: {
    type: Array,
    "default": []
  },
  likes_count: {
    type: Number,
    "default": 0
  },
  comments_count: {
    type: Number,
    "default": 0
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
var Post = exports.Post = _mongoose["default"].model("Post", postSchema);
//# sourceMappingURL=post-model.js.map