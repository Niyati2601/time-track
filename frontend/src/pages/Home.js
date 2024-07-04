// src/pages/Home.js
import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import MainButtons from "../components/MainButtons";
import Dashboard from "./Dashboard/Dashboard";
import apiUrl from "../api/Api";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../redux/userSlice";
import toast from "react-hot-toast";
import { Outlet } from 'react-router-dom';
const Home = () => {
  const dispatch = useDispatch();
  const fetchUserDetails = async () => {
    try {
      const response = await fetch(apiUrl.current_user.url, {
        method: apiUrl.current_user.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
      });

      const data = await response.json();

      if (data.success) {
        dispatch(setUserDetails(data.data));
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);
  return (
    <div className="flex h-screen relative">
      <Sidebar />
      <div className="flex flex-col flex-grow bg-gray-100">
        <Navbar />
        <div className="flex-grow p-4 bg-gray-100">
          <Outlet />
        </div>
      </div>
      <MainButtons className="absolute bottom-4 right-4" />
    </div>
  );
};

export default Home;
