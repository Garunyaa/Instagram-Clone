"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.successResponse = exports.errorResponse = void 0;
var successResponse = exports.successResponse = function successResponse(res, statusCode, message) {
  var response = {
    status: true,
    message: message,
    status_code: statusCode
  };
  return res.status(statusCode).json(response);
};
var errorResponse = exports.errorResponse = function errorResponse(res, statusCode, message) {
  var response = {
    status: false,
    error: message,
    status_code: statusCode
  };
  return res.status(statusCode).json(response);
};
//# sourceMappingURL=response.js.map