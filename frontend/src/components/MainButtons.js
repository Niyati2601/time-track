// src/components/MainButtons.js
import React from 'react';
import { FaRegPauseCircle } from "react-icons/fa";
import { MdOutlineTimer } from "react-icons/md";
import { MdOutlinePlayCircleOutline } from "react-icons/md";

const MainButtons = ({ className }) => {
  return (
    <div className={`flex justify-end items-center ${className}`}>
      <button className="flex items-center bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-1">
        <MdOutlineTimer className="text-xl mr-1" />
        Time log
      </button>
      <button className="flex items-center bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mr-1">
        <FaRegPauseCircle className="text-xl mr-1" />
        Clock Out
      </button>
      <button className="flex items-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
        <MdOutlinePlayCircleOutline className="text-xl mr-1" />
        Clock In
      </button>
    </div>
  );
};

export default MainButtons;
