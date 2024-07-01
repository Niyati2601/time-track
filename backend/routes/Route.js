const express = require("express");
const router = express.Router();
const  signup  = require("../controllers/Signup");
const  userLoginController  = require("../controllers/Login");
const Middleware = require("../middleware/Middleware");
const GetUserDetails = require("../controllers/GetUserDetails");
const EditProfile = require("../controllers/EditProfile");
const Logout = require("../controllers/Logout");
const ClockInOut = require("../controllers/ClockInOut");

router.post("/signup", signup);
router.post("/login", userLoginController);

router.get("/user-details", Middleware, GetUserDetails);

router.put("/edit-profile", Middleware, EditProfile);
// router.post('/clock-in-out', Middleware, ClockInOut);
router.post('/clockin', Middleware, ClockInOut.clockIn);
router.post('/clockout',Middleware, ClockInOut.clockOut);
router.post("/clock-history", Middleware, ClockInOut.clockInAndOut);

router.post("/logout", Middleware, Logout);

module.exports = router