// src/components/MainButtons.js
import React, { useState } from "react";
import { FaRegPauseCircle } from "react-icons/fa";
import { MdOutlineTimer } from "react-icons/md";
import { MdOutlinePlayCircleOutline } from "react-icons/md";
import TimelogEditor from "./TimelogEditor";

const MainButtons = ({ className }) => {
  const [isClocking, setIsClocking] = useState(false);
  const [isTimeLogOpen, setIsTimeLogOpen] = useState(false);

  const toggleModal = () => {
    setIsTimeLogOpen(!isTimeLogOpen);
  };
  return (
    <div className={`flex justify-end items-center ${className}`}>
      <button
        className="flex items-center bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-1"
        onClick={() => toggleModal()}
      >
        <MdOutlineTimer className="text-xl mr-1" />
        Time log
      </button>

      {!isClocking ? (
        <button
          className="flex items-center bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mr-1"
          onClick={() => setIsClocking(true)}
        >
          <FaRegPauseCircle className="text-xl mr-1" />
          Clock Out
        </button>
      ) : (
        <button
          className="flex items-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          onClick={() => setIsClocking(false)}
        >
          <MdOutlinePlayCircleOutline className="text-xl mr-1" />
          Clock In
        </button>
      )}
      <TimelogEditor onOpen={isTimeLogOpen} onClose={toggleModal} />
    </div>
  );
};

export default MainButtons;
