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

function App() {
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
        </Route>
      </Routes>
    </>
  );
}

export default App;
