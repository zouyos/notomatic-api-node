const jwt = require("jsonwebtoken");
require("dotenv").config();
const Cookies = require("cookies");

module.exports = (req, res, next) => {
  try {
    const cookies = new Cookies(req, res);
    const token = cookies.get("token");

    if (!token) {
      throw new Error("Authentication failed");
    }

    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const userId = decodedToken.userId;
    req.auth = {
      userId: userId,
    };
    next();
  } catch (err) {
    res.status(401).json({ error: "Authentication failed" });
  }
};
