import jwt from "jsonwebtoken";
import config from "../startup/config";

const auth = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied. Token not provided");

  try {
    req.user = jwt.verify(token, config.jwtKey);
    next();
  } catch (ex) {
    res.status(400).send("Invalid token");
  }
};

export default auth;
