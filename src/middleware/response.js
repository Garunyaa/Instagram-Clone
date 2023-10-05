const successResponse = (res, statusCode, message, data) => {
  const response = {
    status: true,
    message: message,
    status_code: statusCode,
    data: data,
  };
  return res.status(statusCode).json(response);
};

const errorResponse = (res, statusCode, message, error) => {
  const response = {
    status: false,
    error: message,
    status_code: statusCode,
    error: error.message,
  };
  return res.status(statusCode).json(response);
};

module.exports = {
  successResponse,
  errorResponse,
};
