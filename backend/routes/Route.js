const express = require("express");
const router = express.Router();
const signup = require("../controllers/Signup");
const userLoginController = require("../controllers/Login");
const Middleware = require("../middleware/Middleware");
const GetUserDetails = require("../controllers/GetUserDetails");
const EditProfile = require("../controllers/EditProfile");
const Logout = require("../controllers/Logout");
const addLog = require("../controllers/addLog");
const ClockInOut = require("../controllers/ClockInOut");
const getLogs = require("../controllers/getLogs");
const getAllLogs = require("../controllers/getAlllogs");
const deleteLog = require("../controllers/DeleteLog");
const editLog = require("../controllers/EditLog");
const dataController = require("../controllers/dataController");
const DayInOut = require("../controllers/DayInOut");
const weekLogs = require("../controllers/weekLogs");

router.post("/signup", signup);
router.post("/login", userLoginController);

router.get("/user-details", Middleware, GetUserDetails);

router.put("/edit-profile", Middleware, EditProfile);
// router.post('/clock-in-out', Middleware, ClockInOut);
router.post("/clockin", Middleware, ClockInOut.clockIn);
router.post("/clockout", Middleware, ClockInOut.clockOut);
router.post("/clock-history", Middleware, ClockInOut.clockInAndOut);

router.post("/logout", Middleware, Logout);

router.post("/timelog", Middleware, addLog.addLog);

router.get("/getlogs", Middleware, getLogs);

router.get("/getAllLogs", Middleware, getAllLogs);

router.patch("/updateEndTime", Middleware, addLog.updateEndTimeInTimeLog);

router.delete("/delete-log", Middleware, deleteLog);
router.patch('/edit-log', Middleware, editLog);
router.get("/projects", dataController.getProjects);
router.get("/tags", dataController.getTags);
router.get("/tickets", dataController.getTickets);

router.post('/dayIn',Middleware, DayInOut.postDayIn);
router.post('/dayOut',Middleware, DayInOut.postDayOut);

router.get('/weekLogs',Middleware, weekLogs)


module.exports = router;
