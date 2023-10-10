import jwt from "jsonwebtoken";
import { errorResponse } from "../middleware/response";

export const authenticateToken = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    errorResponse(res, 401, "No token provided");
  }

  jwt.verify(token, process.env.SECRET_KEY, (error, user) => {
    if (error) {
      errorResponse(res, 403, "Forbidden");
    }
    req.user = user;
    next();
  });
};
