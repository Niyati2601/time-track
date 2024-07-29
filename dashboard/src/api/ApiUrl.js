const backendDomain = "http://localhost:8000";

const apiUrl = {
    login: {
        url: `${backendDomain}/api/admin-login`,
        method: "post",
    },
    adminDetails: {
        url: `${backendDomain}/api/admin-details`,
        method: "get",
    },
    getAllUsers: {
        url: `${backendDomain}/api/getAllUsers`,
        method: "get",
      },
    getUserById: {
        url: `${backendDomain}/api/users`,
        method: "get",
    },
    deleteUserById: {
        url: `${backendDomain}/api/users`,
        method: "delete",
    },
    getLogs: {
        url: `${backendDomain}/api/user-logs`,
        method: "get",
    },
    getGivenFeedbacks :{
        url: `${backendDomain}/api/user-given-feedback`,
        method: "get",
    },
    getReceivedFeedbacks :{
        url: `${backendDomain}/api/user-received-feedback`,
        method: "get",
    },
    signUp: {
        url: `${backendDomain}/api/signup`,
        method: "post",
    },
    signUpAdmin: {
        url: `${backendDomain}/api/admin-signup`,
        method: "post",
    },
    addProject : {
        url: `${backendDomain}/api/add-project`,
        method: "post",
    },
    getProjects : {
        url: `${backendDomain}/api/get-projects`,
        method: "get",
    },
    getProjectById : {
        url: `${backendDomain}/api/get-projects`,
        method: "get",  
    },
    updateProject : {
        url: `${backendDomain}/api/update-project`,
        method: "PATCH",
    },
    deleteProject : {
        url: `${backendDomain}/api/delete-project`,
        method: "delete",
    },
    getAssigneesByProjectId : {
        url: `${backendDomain}/api/get-assignee-by-projectId`,
        method: "get",
    },
    getProjectsByUserIdAdmin : {
        url: `${backendDomain}/api/project-assignee`,
        method: "get",
    },
    editUser : {
        url: `${backendDomain}/api/edit-user`,
        method: "PATCH",
    },
    addCategory : {
        url: `${backendDomain}/api/add-category`,
        method: "post",
    },
    getCategories : {
        url: `${backendDomain}/api/get-category`,
        method: "get",
    },
    deleteCategory : {
        url: `${backendDomain}/api/delete-category`,
        method: "delete",
    },
    editCategory : {
        url: `${backendDomain}/api/edit-category`,
        method: "PATCH",
    },
    logout: {
        url: `${backendDomain}/api/admin-logout`,
        method: "post",
    },
    editProfile: {
        url: `${backendDomain}/api/admin-edit-profile`,
        method: "PATCH",
    },
    clockInOut:{
        url: `${backendDomain}/api/clock-history`,
        method: "post",
    },
    editClock :{
        url: `${backendDomain}/api/edit-clock-in-out`,
        method: "PATCH",
    },
    getGeneralFeedbacks :{
        url: `${backendDomain}/api/get-general-feedbacks`,
        method: "get",
    },
    deleteFeedbacks:{
        url: `${backendDomain}/api/delete-feedback`,
        method: "delete",
    },
    getAllFeedbacks:{
        url: `${backendDomain}/api/get-all-feedbacks`,
        method: "get",
    },
    editLogs: {
        url: `${backendDomain}/api/admin-edit-log`,
        method: "PATCH",
    },
    getTags:{
        url: `${backendDomain}/api/tags`,
        method: "get",
    },
};
export default apiUrl;