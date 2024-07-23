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
const projectController = require('../controllers/ProjectController');
const EditUser = require("../controllers/EdituserForAdmin");
const categoriesController = require("../controllers/CategoriesController");
const adminLoginController = require("../controllers/AdminLogin");

router.post("/signup", signup.signup);
router.post("/login", userLoginController);
router.post("/logout", Logout.Logout);


router.get("/user-details", Middleware.Middleware, GetUserDetails.GetUserDetails);
router.put("/edit-profile", Middleware.Middleware, EditProfile.EditProfile);

// router.post('/clock-in-out', Middleware, ClockInOut);
router.post("/clockin", Middleware.Middleware, ClockInOut.clockIn);
router.post("/clockout", Middleware.Middleware, ClockInOut.clockOut);
router.post("/clock-history", Middleware.Middleware, ClockInOut.clockInAndOut);


router.post("/timelog", Middleware.Middleware, addLog.addLog);
router.get("/getlogs", Middleware.Middleware, getLogs);
router.get("/getAllLogs", Middleware.Middleware, getAllLogs);
router.delete("/delete-log", Middleware.Middleware, deleteLog);


router.get('/weekLogs',Middleware.Middleware, weekLogs)
router.get('/monthLogs', Middleware.Middleware, monthLogs);
router.post('/getCustomLogs', Middleware.Middleware, getCustomLogs);
router.patch("/updateEndTime", Middleware.Middleware, addLog.updateEndTimeInTimeLog);

router.get("/projects", dataController.getProjects);
router.get("/tags", dataController.getTags);
router.get("/tickets", dataController.getTickets);

router.post('/dayIn',Middleware.Middleware, DayInOut.postDayIn);
router.post('/dayOut',Middleware.Middleware, DayInOut.postDayOut);


router.post('/feedback',Middleware.Middleware, feedbackController.createFeedback);
router.get('/getFeedback',Middleware.Middleware, feedbackController.getAllFeedbacks);
router.get('/receivedFeedbacks',Middleware.Middleware, feedbackController.receivedFeedbacks);

router.get("/getAllUsers",  getAllUsers);
router.get('/getProjects', Middleware.Middleware, projectController.getProjectsByUserId);






/* admin routes */
router.post("/admin-signup", signup.adminSignup);
router.post("/admin-login",adminLoginController);
router.post("/admin-logout", Logout.AdminLogout);
router.patch("/admin-edit-profile",  Middleware.isAdmin, EditProfile.AdminEditProfile)
router.get("/admin-details", Middleware.isAdmin, GetUserDetails.GetAdminDetails);
router.get("/users/:id", Middleware.isAdmin, GetUserById);
router.delete("/users/:id", Middleware.isAdmin, DeleteUserById);
router.get("/user-logs/:id", Middleware.isAdmin, GetUserLogsById);
router.get("/user-given-feedback/:id", Middleware.isAdmin, GetGivenFeedbacksById);
router.get("/user-received-feedback/:id", Middleware.isAdmin, GetReceivedFeedbacksById);
router.get('/get-projects', projectController.getAllProjects);
router.get('/get-projects/:id', projectController.getProjectById);
router.post('/add-project', projectController.createProject);
router.patch('/update-project/:id', projectController.updateProject);
router.delete('/delete-project/:id', projectController.deleteProject)
router.get('/get-assignee-by-projectId/:id', projectController.getAssigneesByProjectId);
router.get('/project-assignee/:id', projectController.getProjectsByUserIdAdmin);
router.patch('/edit-user/:id', EditUser);
router.post('/add-category', categoriesController.addCategory);
router.get('/get-category', categoriesController.getCategory);
router.patch('/edit-category/:id', categoriesController.editCategory);
router.delete('/delete-category/:id', categoriesController.deleteCategory);

module.exports = router;
