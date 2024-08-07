import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Chart from "../../components/chart/Chart";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import List from "../../components/table/Table";
import "./Single.scss";
import apiUrl from "../../api/ApiUrl";
import FeedbackTable from "../../components/feedbackTable.js/FeedbackTable";
import ReceivedFeedbackTable from "../../components/feedbackTable.js/ReceivedFeedbackTable";
import { IoArrowBack } from "react-icons/io5";
import defaultImage from "../../assests/defaultImage.jpg";
import ProjectAssignedForUsers from "../../components/ProjectAssignedTableForUsers/ProjectAssignedForUsers";
import imageToBase64 from "../../helpers/imageToBase64";
import ClockInOutTable from "../../components/clockInOutTable/ClockInOutTable";

const Single = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [mentor, setMentor] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`${apiUrl.getUserById.url}/${id}`, {
          method: apiUrl.getUserById.method,
          credentials: "include",
          headers: {
            "content-type": "application/json",
          },
        });
        const data = await response.json();
        setUser(data.data);
        setProfilePhoto(data.data.profilePhoto || defaultImage);
        setUsername(data.data.username);
        setEmail(data.data.email);
        setMentor(data.data.isMentor);
      } catch (error) {
        console.error("Failed to fetch user details:", error);
      }
    };

    fetchUserDetails();
  }, [id]);

  const toggleEditModal = () => {
    setIsEditProfileModalOpen(!isEditProfileModalOpen);
  };

  const handleProfilePhotoChange = async (e) => {
    const file = e.target.files[0];
    const base64 = await imageToBase64(file);
    setProfilePhoto(base64);
  };

  const handleEditProfileSubmit = async () => {
    const updatedUser = {
      username,
      email,
      profilePhoto,
    };

    try {
      const response = await fetch(`${apiUrl.editUser.url}/${id}`, {
        method: apiUrl.editUser.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });
      const data = await response.json();
      if (data.success) {
        setUser(data.data);
        setIsEditProfileModalOpen(false);
      }
    } catch (error) {
      console.error("Failed to edit user profile:", error);
    }
  };

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <button className="back" onClick={() => navigate(-1)}>
          <IoArrowBack className="icon" />
          Back
        </button>
        <div className="top">
          <div className="left">
            <div className="editButton" onClick={toggleEditModal}>
              Edit
            </div>
            <h1 className="title">Information</h1>
            <div className="item">
              <img
                src={user?.profilePhoto ? user?.profilePhoto : defaultImage}
                alt=""
                className="itemImg"
                onClick={() => setPhotoPreview(true)}
              />
              <div className="details">
                <h1 className="itemTitle">{user?.username}</h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{user?.email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">User Id:</span>
                  <span className="itemValue">{user?._id}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Mentor:</span>
                  <span className="itemValue">{user?.isMentor ? "Yes" : "No"}</span>
                </div>

              </div>
            </div>
          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
          </div>
        </div>
        {user?.role === "user" && (
          <>
            <div className="bottom">
              <h1 className="title">User Logs</h1>
              <List />
            </div>
            <div className="bottom">
              <h1 className="title">Feedbacks (Given)</h1>
              <FeedbackTable />
            </div>
            <div className="bottom">
              <h1 className="title">Feedbacks (Received)</h1>
              <ReceivedFeedbackTable />
            </div>
            <div className="bottom">
              <h1 className="title">Projects</h1>
              <ProjectAssignedForUsers />
            </div>
            <div className="bottom">
              <h1 className="title">Clock In/Out Details</h1>
              <ClockInOutTable />
            </div>
          </>
        )}
      </div>
      {photoPreview && (
        <div className="previewContainer">
          <button
              onClick={() => setPhotoPreview(false)}
              className="closeIcon"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="50"
                height="50"
                viewBox="0 0 50 50"
              >
                <path
                  fill="red"
                  d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"
                ></path>
              </svg>
            </button>
          <div className="photoPreview">
            <img
              src={profilePhoto}
              alt="profile"
              className="modal-logo"
              style={{
                cursor: "pointer",
                width: "70%",
                height: "50%",
              }}
            />
          </div>
        </div>
      )}

      {isEditProfileModalOpen && (
        <div className="edit-profile-modal-overlay">
          <div className="edit-profile-modal-content">
            <h2 className="modal-title">Edit Profile</h2>
            <form onSubmit={handleEditProfileSubmit}>
              <div className="form-group">
                <label htmlFor="profilePhoto">Profile Photo</label>
                <input
                  type="file"
                  className="form-control"
                  id="profilePhoto"
                  style={{ display: "none" }}
                  onChange={handleProfilePhotoChange}
                />
                <img
                  src={profilePhoto}
                  alt="profile"
                  className="modal-logo"
                  style={{
                    cursor: "pointer",
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                  }}
                  onClick={() =>
                    document.getElementById("profilePhoto").click()
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="modal-buttons">
                <button type="submit" className="submit-button">
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditProfileModalOpen(false)}
                  className="cancel-button"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Single;
