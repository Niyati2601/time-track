// src/Sidebar.js
import React, { useState } from 'react';
import logo from '../assets/logo.png';
import { IoHomeOutline } from "react-icons/io5";
import { FaRegClock } from "react-icons/fa6";
import { MdArrowForward } from "react-icons/md"; // For the arrow icon

const sidebarItems = [
  { icon: <IoHomeOutline />, text: 'Home' },
  { icon: <FaRegClock />, text: 'Clock In/Out' },
];

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={`flex flex-col bg-[#283046] text-white h-screen transition-width duration-300 ${isExpanded ? 'w-52' : 'w-20'}`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Logo */}
      <div className="flex items-center my-4 px-4">
        <img src={logo} alt="Logo" className="w-14 h-14" />
        <span className={`ml-4 text-xl font-semibold ${isExpanded ? 'block' : 'hidden'}`}>TimeTrack</span>
      </div>

      {/* Sidebar Items */}
      {sidebarItems.map((item, index) => (
        <div key={index} className="my-4 flex items-center w-full px-4 hover:bg-[#283065] p-4">
          <span className="text-2xl">{item.icon}</span>
          <span className={`ml-4 ${isExpanded ? 'block' : 'hidden'}`}>{item.text}</span>
        </div>
      ))}

      {/* Day In and Day Out Buttons */}
      <div className="mt-auto px-4 py-2">
        <button className="flex items-center bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded">
          <MdArrowForward className="text-xl mr-2" />
          Day In
        </button>
        <button className="flex items-center mt-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded">
          <MdArrowForward className="text-xl mr-2" />
          Day Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
