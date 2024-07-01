import { Toaster } from "react-hot-toast";
import "./App.css";
import Signup from "./pages/Signup";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ClockInOut from "./pages/ClockInOut/ClockInOut";
import { ClockingProvider } from '../src/context/ClockingContext';

function App() {
  return (
    <>
      <Toaster />
      <Routes>
      <Route exact path="/"  element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/home" element={<ClockingProvider> <Home /> </ClockingProvider> } />
      <Route path="/clockInOut"element={<ClockingProvider> <ClockInOut /> </ClockingProvider>} />
      </Routes>
    </>
  );
}

export default App;
