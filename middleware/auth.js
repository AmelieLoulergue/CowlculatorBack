const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
    const userId = decodedToken.userId;
    req.auth = { userId };
    if (req.body.userId && req.body.userId !== userId) {
      res.status(401).json({
        error: "Invalid user ID",
      });
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: "Invalid request!",
    });
  }
};
