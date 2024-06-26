import { Toaster } from "react-hot-toast";
import "./App.css";
import Signup from "./pages/Signup";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";

function App() {
  return (
    <>
      <Toaster />
      <Routes>
      <Route exact path="/"  element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
