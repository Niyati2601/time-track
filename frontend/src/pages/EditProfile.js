import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { MdCloudUpload } from "react-icons/md";
import apiUrl from "../api/Api";
import { useNavigate } from "react-router-dom";
import  toast  from "react-hot-toast";
import imageToBase64 from "../helpers/imageToBase64";

const EditProfile = ({ isOpen, onRequestClose }) => {
  const user = useSelector((state) => state.user);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setUsername(user.user.username || "");
      setEmail(user.user.email || "");
      setPassword(user.user.password || "");
      setPhotoPreview(user.user.profilePhoto || "");
    }
  }, [user]);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

 

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    const picture = await imageToBase64(file); // Convert image to base64
    setProfilePhoto(picture); // Set base64 image data
    setPhotoPreview(URL.createObjectURL(file)); // Preview image
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      // Call the logout API
      const res = await fetch(apiUrl.editProfile.url, {
        method: apiUrl.editProfile.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
          profilePhoto,
          }),
      });

      const data = await res.json();

      // Check if logout was successful
      if (data.success) {
        toast.success("Profile updated Successful");
        navigate("/home");
      } else {
        toast.error("Error Updating Profile");
      }
    } catch (error) {
      toast.error(error.message);
    }
    onRequestClose();
    // Dispatch action to update user
    // dispatch(updateUser(formDataToSubmit));
  };

  return (
    isOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-gray-800 bg-opacity-50">
        <div className="relative w-full max-w-lg p-6 bg-white rounded-md shadow-lg">
          <button
            onClick={onRequestClose}
            className="absolute top-0 right-0 mt-4 mr-4 text-gray-600 hover:text-gray-900"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
          <h2 className="mb-4 text-2xl font-bold text-center">Edit Profile</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col items-center">
              <img
                className="w-24 h-24 rounded-full ring-2 ring-white"
                src={photoPreview}
                alt="Profile"
              />
              <label className="mt-4 flex items-center text-gray-600 cursor-pointer">
                <div className="flex bg-[#283046] text-white p-3">
                  <MdCloudUpload className="mr-2 text-2xl" />
                  <span>Change profile photo</span>
                </div>
                <input
                  type="file"
                  className="hidden"
                  onChange={handlePhotoChange}
                  accept="image/*"
                />
              </label>
            </div>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              type="text"
              name="username"
              placeholder="Username"
              value={username}
              onChange={handleUsernameChange}
              required
            />
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 cursor-not-allowed"
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
              disabled
              required
            />
            {/* <div className="relative">
              <input
                className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
              />
              <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div> */}
            <button
              type="submit"
              className="w-full px-4 py-2 font-semibold text-white bg-[#283046] rounded-lg hover:bg-blue-900 focus:outline-none focus:bg-blue-700"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    )
  );
};

export default EditProfile;
