const express = require("express");
const router = express.Router();
const  signup  = require("../controllers/Signup");

router.post("/signup", signup);

module.exports = router