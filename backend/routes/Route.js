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
const monthLogs = require("../controllers/monthLogs");
const getCustomLogs = require("../controllers/GetCustomLogs");
const feedbackController = require('../controllers/FeedbackController');
const getAllUsers = require("../controllers/GetAllUsers");
const GetUserById = require("../controllers/GetUserById");
const DeleteUserById = require("../controllers/DeleteUserById");
const GetUserLogsById = require("../controllers/GetUserLogsById");
const GetGivenFeedbacksById = require("../controllers/GetGivenFeedbacksById");
const GetReceivedFeedbacksById = require("../controllers/GetReceivedFeedbacksById");

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
router.get('/monthLogs', Middleware, monthLogs);

router.post('/getCustomLogs', Middleware, getCustomLogs);

router.post('/feedback',Middleware, feedbackController.createFeedback);
router.get('/getFeedback',Middleware, feedbackController.getAllFeedbacks);
router.get('/receivedFeedbacks',Middleware, feedbackController.receivedFeedbacks);

router.get("/getAllUsers", Middleware, getAllUsers);

/* admin routes */
router.get("/users/:id", Middleware, GetUserById);
router.delete("/users/:id", Middleware, DeleteUserById);
router.get("/user-logs/:id", Middleware, GetUserLogsById);
router.get("/user-given-feedback/:id", Middleware, GetGivenFeedbacksById);
router.get("/user-received-feedback/:id", Middleware, GetReceivedFeedbacksById);

module.exports = router;
