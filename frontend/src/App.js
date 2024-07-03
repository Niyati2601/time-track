import { Toaster } from "react-hot-toast";
import "./App.css";
import Signup from "./pages/Signup";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ClockInOut from "./pages/ClockInOut/ClockInOut";
import { ClockingProvider } from '../src/context/ClockingContext';
import Timesheet from "./pages/Timesheet";

function App() {
  return (
    <>
      <Toaster />
      <Routes>
      <Route exact path="/"  element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/home" element={<ClockingProvider> <Home /> </ClockingProvider> } />
      <Route path="/clockInOut"element={<ClockingProvider> <ClockInOut /> </ClockingProvider>} />
      <Route path="/timesheet" element={<ClockingProvider> <Timesheet /> </ClockingProvider>} />
      </Routes>
    </>
  );
}

export default App;
