import React, { useState } from "react";
import "./Signup.scss";
import imageToBase64 from "../../helpers/imageToBase64";
import Logo from "../../assests/defaultImage.jpg";
import apiUrl from "../../api/ApiUrl";
import {useNavigate} from 'react-router-dom';
import toast from "react-hot-toast";

const Signup = () => {
    const navigate = useNavigate();
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
    profilePhoto: "",
  });

  const handleProfilePicture = async (e) => {
    const file = e.target.files[0];
    const picture = await imageToBase64(file);
    setNewUser((prev) => {
      return {
        ...prev,
        profilePhoto: picture,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
      const res = await fetch(apiUrl.signUpAdmin.url, {
        credentials: "include",
        method: apiUrl.signUpAdmin.method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      const data = await res.json();
      if (data.success) {
        setNewUser({
         username: "",
          email: "",
          password: "",
          profilePhoto: "",
        });
        navigate("/login");
        toast.success(data.message);
      } else {
        toast.error('Signup failed:', data.message);
      }
    } catch (error) {
      toast.error('Error during signup:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  return (
    <div className="signup">
      <form className="form2" onSubmit={handleSubmit}>
        <h4>Time-Track</h4>
        <p>Signup</p>
        <label htmlFor="file">
          <input
            type="file"
            id="file"
            style={{ display: "none", cursor: "pointer" }}
            onChange={handleProfilePicture}
          />
          <img
            src={newUser.profilePhoto ? newUser.profilePhoto : Logo}
            alt="logo"
            className="modal-logo"
            style={{
              cursor: "pointer",
              width: "70px",
              height: "70px",
              borderRadius: "50%",
              border: "1px solid #7451f8",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "auto",
            }}
          />
          <h3
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "auto",
            }}
          >
            Upload Project Logo
          </h3>
        </label>
        <input
          type="text"
          name="username"
          value={newUser.username}
          onChange={handleChange}
          placeholder="Admin Name"
          required
        />
        <input
          type="email"
          name="email"
          value={newUser.email}
          onChange={handleChange}
          placeholder="Email"
          autoComplete="off"
          required
        />
        <input
          type="password"
          name="password"
          value={newUser.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <input type="submit" value="Signup" />
      </form>
    </div>
  );
};

export default Signup;
