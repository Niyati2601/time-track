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
  getAllLogs: {
    url: `${backendDomain}/api/getAllLogs`,
    method: "get",
  },
  updateEndTime: {
    url: `${backendDomain}/api/updateEndTime`,
    method: "PATCH",
  },
  deleteLog: {
    url: `${backendDomain}/api/delete-log`,
    method: "delete",
  },
  editLog: {
    url: `${backendDomain}/api/edit-log`,
    method: "PATCH",
  },
  getProjects: {
    url: `${backendDomain}/api/projects`,
    method: "get",
  },
  getTags: {
    url: `${backendDomain}/api/tags`,
    method: "get",
  },
  getTickets: {
    url: `${backendDomain}/api/tickets`,
    method: "get",
  },
  dayIn: {
    url: `${backendDomain}/api/dayIn`,
    method: "post",
  },
  dayOut: {
    url: `${backendDomain}/api/dayOut`,
    method: "post",
  },
  weekLogs: {
    url: `${backendDomain}/api/weekLogs`,
    method: "get",
  },
  monthLogs: {
    url: `${backendDomain}/api/monthLogs`,
    method: "get",
  },
};
export default apiUrl