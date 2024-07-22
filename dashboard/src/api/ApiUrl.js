const backendDomain = "http://localhost:8000";

const apiUrl = {
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
};
export default apiUrl;