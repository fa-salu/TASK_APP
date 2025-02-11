import { verifyToken } from "../utils/tokenUtils.js";

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const decoded = verifyToken(token);
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export default authMiddleware;
