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
};
export default apiUrl;