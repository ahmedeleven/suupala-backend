import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", ""); // extract the token from the request

  if (!token) {
    res.status(401).json({ message: "There is no token!" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token is not valid!" });
  }
};
