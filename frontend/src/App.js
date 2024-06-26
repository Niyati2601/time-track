import { Toaster } from "react-hot-toast";
import "./App.css";
import Signup from "./pages/Signup";

function App() {
  return (
    <>
      <Toaster />
      <Signup exact path="/signup" component={Signup} />
    </>
  );
}

export default App;
