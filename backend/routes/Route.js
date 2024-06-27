const express = require("express");
const router = express.Router();
const  signup  = require("../controllers/Signup");
const  userLoginController  = require("../controllers/Login");
const Middleware = require("../middleware/Middleware");
const GetUserDetails = require("../controllers/GetUserDetails");

router.post("/signup", signup);
router.post("/login", userLoginController);

router.get("/user-details", Middleware, GetUserDetails);

module.exports = router