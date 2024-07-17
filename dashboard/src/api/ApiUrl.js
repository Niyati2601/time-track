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
};
export default apiUrl;