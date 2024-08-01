import { Toaster } from "react-hot-toast";
import "./App.css";
import Signup from "./pages/Signup";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import ClockInOut from "./pages/ClockInOut/ClockInOut";
import { ClockingProvider } from './context/ClockingContext';
import Timesheet from "./pages/Timesheet";
import Home from './pages/Home';
import Dashboard from "./pages/Dashboard/Dashboard";
import apiUrl from "./api/Api";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./redux/userSlice";
import { useEffect } from "react";
import FeedBack from "./pages/Feedback/FeedBack";
import Project from "./pages/project/Project";
import ProjectDetails from "./pages/project/ProjectDetails";

function App() {
  const dispatch = useDispatch();
  const fetchUserDetails = async () => {
    try {
      const response = await fetch(apiUrl.current_user.url, {
        method: apiUrl.current_user.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
      });

      const data = await response.json();

      if (data.success) {
        dispatch(setUserDetails(data.data));
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  },);
  return (
    <>
      <Toaster />
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/"
          element={<ClockingProvider><Home /></ClockingProvider>}
        >
          <Route path="home" element={<Dashboard />} />
          <Route path="clockInOut" element={<ClockInOut />} />
          <Route path="timesheet" element={<Timesheet />} />
          <Route path="projects" element={<Project />} />
          <Route path="project-details/:id" element={<ProjectDetails />} />
          <Route path="feedback" element={<FeedBack />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
