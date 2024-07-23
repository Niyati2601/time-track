// const jwt = require("jsonwebtoken");

// const Middleware = (req, res, next) => {
//   try {
//     const token = req.cookies?.token;
    

//     if (!token) {
//       return res
//         .status(401)
//         .json({ message: "Token is missing", error: true, success: false });
//     }
//     jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, user) => {
//       if (err) {
//         return res.status(401).json({ message: "Please Login" });
//       }

//       req.userId = user?._id;
//       next();
//     });
//   } catch (error) {
//     res.status(400).json({
//       message: error.message || error,
//       data: [],
//       error: true,
//       success: false,
//     });
//   }
// };

// module.exports = Middleware;
const jwt = require('jsonwebtoken');

const Middleware = (req, res, next) => {
    const token = req.cookies?.token;
    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    jwt.verify(token, process.env.TOKEN_SECRET_ADMIN, (err, decoded) => {
      console.log('decoded: ', decoded);
        if (err) {
            return res.status(500).json({ message: 'Failed to authenticate token' });
        }
        req.userId = decoded?._id;
        req.userRole = decoded?.role;
        next();
    });
};

const isAdmin = (req, res, next) => {
    const token = req.cookies?.token;
    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
      console.log('decoded: ', decoded);
        if (err) {
            return res.status(500).json({ message: 'Failed to authenticate token' });
        }
        req.userId = decoded?._id;
        req.userRole = decoded?.role;
        next();
    });
    if (req.userRole !== 'admin') {
        return res.status(403).json({ message: 'Requires admin role' });
    }
    next();
};

module.exports = { Middleware, isAdmin };
