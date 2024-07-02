// src/components/Sidebar.js
import React, { useState, useContext } from "react";
import logo from "../assets/logo.png";
import { IoHomeOutline } from "react-icons/io5";
import { FaRegClock } from "react-icons/fa";
import { MdOutlineTimer } from "react-icons/md";
import { LuTimerOff } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { ClockingContext } from "../context/ClockingContext";

const sidebarItems = [
  { icon: <IoHomeOutline />, text: "Home", onClick: "/home" },
  { icon: <FaRegClock />, text: "Clock In/Out", onClick: "/clockInOut" },
];

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDayIn, setIsDayIn] = useState(false);
  const { isClocking, setIsClocking } = useContext(ClockingContext);

  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleDayInOut = () => {
    if (!isDayIn) {
      setIsClocking(true);
    } else {
      setIsClocking(false);
    }
    setIsDayIn(!isDayIn);
  };

  return (
    <div
      className={`flex flex-col bg-[#283046] text-white h-screen transition-width duration-300 ease-in-out ${
        isExpanded ? "w-52" : "w-20"
      }`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Logo */}
      <div className="flex items-center my-4 px-4">
        <img src={logo} alt="Logo" className="w-14 h-14" />
        <span
          className={`ml-4 text-xl font-semibold ${
            isExpanded ? "block" : "hidden"
          }`}
        >
          TimeTrack
        </span>
      </div>

      {/* Sidebar Items */}
      {sidebarItems.map((item, index) => (
        <div
          key={index}
          className="my-4 flex items-center w-full px-4 hover:bg-[#283065] p-4"
          onClick={() => handleNavigation(item.onClick)}
        >
          <span className="text-2xl">{item.icon}</span>
          <span className={`ml-4 ${isExpanded ? "block" : "hidden"}`}>
            {item.text}
          </span>
        </div>
      ))}

      {/* Day In and Day Out Buttons */}
      <div className="mt-auto px-4 py-2">
        <button
          className={`flex items-center text-center justify-center bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded ${
            isExpanded ? "w-full" : "w-12 justify-center"
          }`}
          onClick={handleDayInOut}
        >
          {isDayIn ? (
            <>
              <LuTimerOff className="text-xl text-center" />
              <span
                className={`ml-2 text-center ${
                  isExpanded ? "block" : "hidden"
                }`}
              >
                Day Out
              </span>
            </>
          ) : (
            <>
              <MdOutlineTimer className="text-xl text-center" />
              <span
                className={`ml-2 text-center ${
                  isExpanded ? "block" : "hidden"
                }`}
              >
                Day In
              </span>
            </>
          )}
        </button>
        {isDayIn && (
          <div
            className={`flex items-center text-center bg-white hover:bg-white text-gray-400 font-bold py-2 px-4 rounded mt-2 ${
              isExpanded ? "block" : "hidden"
            }`}
          >
            <span className={`ml-2`}>Day in at 12:00</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
