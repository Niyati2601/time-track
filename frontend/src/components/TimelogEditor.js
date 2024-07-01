import React, { useEffect, useRef, useState } from "react";
import { FaRegCirclePlay, FaRegCirclePause } from "react-icons/fa6";
import { FiTag } from "react-icons/fi";
import { MdOutlineTimer } from "react-icons/md";
import { RxDividerVertical } from "react-icons/rx";
import { FiEdit } from "react-icons/fi";

const TimelogEditor = ({ onOpen, onClose }) => {
  const [isPlay, setIsPlaying] = useState(false);
  const [isTagOpen, setIsTagOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleTagOpen = () => {
    setIsTagOpen(!isTagOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsTagOpen(false);
    }
  };

  useEffect(() => {
    if (isTagOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isTagOpen]);

  return (
    onOpen && (
      <div
        className="timelog-popup fixed bg-green-500 p-4 rounded-lg shadow-lg z-50 w-[400px] bottom-20 right-28"
        ref={dropdownRef}
      >
        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
          >
            <svg
              className="w-6 h-6 text-white"
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
          <div className="flex items-center">
            <MdOutlineTimer className="text-2xl text-white mr-1" />
            <span className="text-white ">Timer</span>
            <span>
              <RxDividerVertical className="text-white ml-2" />
            </span>
            <span>
              <FiEdit className="text-white ml-2" />
            </span>
            <span className="text-white ml-2">Manual</span>
          </div>
        </div>

        <div className="flex justify-between mb-2 mt-8">
          <select
            type="text"
            placeholder="Select Position"
            className="p-2 bg-green-400 rounded border-none outline-none w-1/2 text-white placeholder-white mr-1"
            name="position"
            required
          >
            <option value="">Select Position</option>
            <option value="1">Intern 2024</option>
            <option value="2">Documentation</option>
            <option value="3">Social Marketing</option>
            <option value="4">Developer</option>
            <option value="5">Designer</option>
          </select>
          <select
            type="text"
            placeholder="Select Ticket"
            className="p-2 bg-green-400 rounded border-none outline-none w-1/2 text-white placeholder-white cursor-not-allowed"
            disabled
          >
            <option value="">Select Ticket</option>
            <option value="1">Ticket 1</option>
            <option value="2">Ticket 2</option>
            <option value="3">Ticket 3</option>
            <option value="4">Ticket 4</option>
            <option value="5">Ticket 5</option>
          </select>
        </div>
        <textarea
          placeholder="Describe your task details in max 2000 characters"
          className="p-2 bg-green-400 rounded border-none outline-none w-full h-24 text-white placeholder-white text-[15px] font-semibold"
        ></textarea>
        <div className="mt-4 flex justify-between">
          <div className="flex justify-between">
            {isPlay ? (
              <>
                <FaRegCirclePause
                  className="text-3xl text-white cursor-pointer"
                  onClick={() => setIsPlaying(false)}
                />
                <span className="text-white ml-5 mt-1 font-bold">03:38:06</span>
              </>
            ) : (
              <FaRegCirclePlay
                className="text-3xl text-white cursor-pointer"
                onClick={() => setIsPlaying(true)}
              />
            )}
          </div>

          <div className="p-2 border border-dashed rounded-full">
            <FiTag
              className="text-xl text-white cursor-pointer "
              onClick={handleTagOpen}
            />
            {isTagOpen && (
              <div
                id="dropdownAvatarName"
                className="z-10 divide-y divide-gray-100 rounded-lg shadow w-48 bg-[#fff] dark:divide-gray-600 absolute right-0 top-9 text-gray-600"
              >
                <div className="p-2 text-sm">
                  <input className="mr-2" type="checkbox" id="bug" />
                  <span>Bug</span>
                </div>
                <div className="p-2 text-sm">
                  <input className="mr-2" type="checkbox" id="content" />
                  <span>Content Writing</span>
                </div>
                <div className="p-2 text-sm">
                  <input className="mr-2" type="checkbox" id="marketing" />
                  <span>Marketing</span>
                </div>
                <div className="p-2 text-sm">
                  <input className="mr-2" type="checkbox" id="development" />
                  <span>Development</span>
                </div>
                <div className="p-2 text-sm">
                  <input className="mr-2" type="checkbox" id="design" />
                  <span>Designing</span>
                </div>
                <div className="p-2 text-sm">
                  <input className="mr-2" type="checkbox" id="learning" />
                  <span>Learning and Development</span>
                </div>
                <div className="p-2 text-sm">
                  <input className="mr-2" type="checkbox" id="task" />
                  <span>Task</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default TimelogEditor;