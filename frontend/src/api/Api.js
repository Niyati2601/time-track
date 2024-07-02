const backendDomain = "http://localhost:8000";

const apiUrl = {
  signUp: {
    url: `${backendDomain}/api/signup`,
    method: "post",
  },
  login: {
    url: `${backendDomain}/api/login`,
    method: "post",
  },
  current_user: {
    url: `${backendDomain}/api/user-details`,
    method: "get",
  },
  logout: {
    url: `${backendDomain}/api/logout`,
    method: "post",
  },
  editProfile: {
    url: `${backendDomain}/api/edit-profile`,
    method: "put",
  },
  clockIn: {
    url: `${backendDomain}/api/clockin`,
    method: "post",
  },
  clockOut: {
    url: `${backendDomain}/api/clockout`,
    method: "post",
  },
  clockHistory: {
    url: `${backendDomain}/api/clock-history`,
    method: "post",
  },
  timelog: {
    url: `${backendDomain}/api/timelog`,
    method: "post",
  },
  getLogs: {
    url: `${backendDomain}/api/getlogs`,
    method: "get",
  },
};
export default apiUrl