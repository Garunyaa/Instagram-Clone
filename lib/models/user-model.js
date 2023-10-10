"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.User = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var userSchema = new _mongoose["default"].Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true,
    min: 6
  },
  otp: {
    type: String
  },
  auth_token: {
    type: String
  },
  followers: {
    type: Array,
    "default": []
  },
  followings: {
    type: Array,
    "default": []
  },
  status: {
    type: Number,
    "default": 1
  }
}, {
  timestamps: true
});
var User = exports.User = _mongoose["default"].model("User", userSchema);
//# sourceMappingURL=user-model.js.map