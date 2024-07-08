// src/pages/Home.js
import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import MainButtons from "../components/MainButtons";
import { Outlet } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex h-screen overflow-hidden relative">
      <Sidebar />
      <div className="flex flex-col flex-grow bg-gray-100 h-full">
        <Navbar />
        <div className="flex-grow p-4 overflow-y-scroll mostly-customized-scrollbar">
          <Outlet />
        </div>
      </div>
      <MainButtons className="absolute bottom-4 right-4" />
    </div>
  );
};

export default Home;
