const jwt = require("../config/jwt");

const authMiddleware = (req, res, next) => {
  try {
    const token =
      req.headers.authorization && req.headers.authorization.split(" ")[1];
    if (!token) return res.status(401).json({ msg: "Unauthorized" });

    const decoded = jwt.verifyToken(token);
    req.currentUserInfo = decoded;
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).send({ msg: "Something went wrong !!!" });
  }
};

module.exports = { authMiddleware };