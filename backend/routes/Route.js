const express = require("express");
const router = express.Router();
const  signup  = require("../controllers/Signup");
const  userLoginController  = require("../controllers/Login");

router.post("/signup", signup);
router.post("/login", userLoginController);

module.exports = router