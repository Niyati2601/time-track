import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Chart from '../../components/chart/Chart';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import List from '../../components/table/Table';
import './Single.scss';
import apiUrl from '../../api/ApiUrl';
import FeedbackTable from '../../components/feedbackTable.js/FeedbackTable';
import ReceivedFeedbackTable from '../../components/feedbackTable.js/ReceivedFeedbackTable';
import { IoArrowBack } from "react-icons/io5";
import defaultImage from '../../assests/defaultImage.jpg';
import ProjectAssignedForUsers from '../../components/ProjectAssignedTableForUsers/ProjectAssignedForUsers';

const Single = () => {
  const { id } = useParams();
  const navigate = useNavigate();  // useNavigate hook
  console.log('id: ', id);
  const [user, setUser] = useState(null);
  console.log('user: ', user);

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
        console.log('data: ', data);
        setUser(data.data);
      } catch (error) {
        console.error('Failed to fetch user details:', error);
      }
    };

    fetchUserDetails();
  }, [id]);

  return (
    <div className='single'>
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <button className='back' onClick={() => navigate('/users')}>
          <IoArrowBack className='icon' />
          Back
        </button>
        <div className="top">
          <div className="left">
            <div className="editButton">Edit</div>
            <h1 className="title">Information</h1>
            <div className="item">
              <img src={user?.profilePhoto ? user?.profilePhoto : defaultImage} alt="" className="itemImg" />
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
              </div>
            </div>
          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
          </div>
        </div>
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
        <div className='bottom'>
          <h1 className="title">Projects</h1>
          <ProjectAssignedForUsers />
        </div>
      </div>
    </div>
  );
};

export default Single;
