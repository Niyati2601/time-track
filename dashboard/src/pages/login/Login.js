import { useState } from "react";
import "./Login.scss";
import apiUrl from "../../api/ApiUrl";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAdminDetails } from "../../redux/adminSlice";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const res = await fetch(apiUrl.login.url, {
        method: apiUrl.login.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setEmail("");
        setPassword("");
        fetchAdminDetails();

        navigate("/");
      } else {
        toast.error("Login failed:", data.message);
      }
    } catch (error) {
      toast.error("Error during login:", error);
    }
  };

  const fetchAdminDetails = async () => {
    try {
      const res = await fetch(apiUrl.adminDetails.url, {
        method: apiUrl.adminDetails.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      if (data.success) {
        dispatch(setAdminDetails(data.data));
      } else {
        toast.error("Failed to fetch admin details:", data.message);
      }
    } catch (error) {
      toast.error("Error fetching admin details:", error);
    }
  };

  return (
    <div className="login">
      <form className="form" onSubmit={handleSubmit}>
        <h4>Time-Track</h4>
        <p>Login</p>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="off"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input type="submit" value="Login" />
      </form>
    </div>
  );
};

export default Login;
