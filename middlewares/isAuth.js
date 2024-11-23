const jwt = require("jsonwebtoken");

const isAuth = (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
      const error = new Error("unauthorized");
      error.statusCode = 400;
      throw error;
    }

    jwt.verify(accessToken, process.env.ACCESS_TOKEN_KEY, (err, decoded) => {
      if (err) {
        return res.status(400).json({ message: "invalid token" });
      } else {
        req.userId = decoded.id;
        req.userRole = decoded.role;
        req.userEmail = decoded.email;
      }
      next();
    });
  } catch (error) {
    next(error);
  }
};

module.exports = isAuth;
