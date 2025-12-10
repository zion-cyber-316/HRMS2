





const jwt = require("jsonwebtoken");
const User = require("../models/Users.js");

const verifyUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ success: false, error: "Token not provided" });
    }

    const token = authHeader.split(" ")[1]; // ✅ सही split

    if (!token) {
      return res.status(401).json({ success: false, error: "Token missing after Bearer" });
    }

    const decoded = jwt.verify(token, process.env.JWT_KEY);

    if (!decoded) {
      return res.status(401).json({ success: false, error: "Invalid token" });
    }

    const user = await User.findById(decoded._id).select("-password");

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Verify User Error:", error);
    return res.status(500).json({ success: false, error: "Server side error" });
  }
};

module.exports = verifyUser;
