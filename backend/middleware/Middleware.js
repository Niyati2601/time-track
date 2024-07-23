const jwt = require("jsonwebtoken");

const Middleware = (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(500).json({ message: "Failed to authenticate token" });
    }
    req.userId = decoded?._id;
    req.userRole = decoded?.role;
    next();
  });
};

const isAdmin = (req, res, next) => {
  const adminToken = req.cookies?.adminToken;
  if (!adminToken) {
    return res.status(403).json({ message: "No token provided" });
  } else {
    jwt.verify(adminToken, process.env.TOKEN_SECRET_ADMIN, (err, decoded) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Failed to authenticate token" });
      }
      req.userId = decoded?._id;
      req.userRole = decoded?.role;

      if (req.userRole !== "admin") {
        return res.status(403).json({ message: "Requires admin role" });
      } else {
        next();
      }
    });
  }
};

module.exports = { Middleware, isAdmin };
