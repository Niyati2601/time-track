// src/pages/Home.js
import React from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import MainButtons from '../components/MainButtons';
import Dashboard from './Dashboard/Dashboard';

const Home = () => {
  return (
    <div className="flex h-screen relative">
      <Sidebar />
      <div className="flex flex-col flex-grow bg-gray-100">
        <Navbar />
        <div className="flex-grow p-4 bg-gray-100">
          <Dashboard />
        </div>
      </div>
      <MainButtons className="absolute bottom-4 right-4" />
    </div>
  );
};

export default Home;
