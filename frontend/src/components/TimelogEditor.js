import React, { useEffect, useRef, useState } from "react";
import { FaRegCirclePlay, FaRegCirclePause } from "react-icons/fa6";
import { FiTag } from "react-icons/fi";
import { MdOutlineTimer } from "react-icons/md";
import { RxDividerVertical } from "react-icons/rx";
import { FiEdit } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import toast from "react-hot-toast";
import apiUrl from "../api/Api";
import { useSelector } from "react-redux";

const TimelogEditor = ({ onOpen, onClose }) => {
  const [isPlay, setIsPlaying] = useState(false);
  const [isTagOpen, setIsTagOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [position, setPosition] = useState("");
  const [title, setTitle] = useState("");

  const user = useSelector((state) => state.user);
  

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

  const handleTagChange = (tag) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag]
    );
  };

  const handleRemoveTag = (tag) => {
    setSelectedTags(selectedTags.filter((t) => t !== tag));
  };

  const handleSubmit = async () => {
    try {
      if (!position || !title || !selectedTags.length) {
        return;
      }
      setIsPlaying(!isPlay);
      const res = await fetch(apiUrl.timelog.url, {
        method: apiUrl.timelog.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          user: user.user._id,
          position,
          title,
          tags: selectedTags,
        }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

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
            <span className="text-white">Timer</span>
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
            value={position} // Ensure `position` state is used
            onChange={(e) => setPosition(e.target.value)} // Handle position change
            type="text"
            placeholder="Select Position"
            className="p-2 bg-green-400 rounded border-none outline-none w-1/2 text-white placeholder-white mr-1"
            name="position"
            required
          >
            <option selected>Select Position</option>
            <option value="Intern 2024">Intern 2024</option>
            <option value="Documentation">Documentation</option>
            <option value="Social Marketing">Social Marketing</option>
            <option value="Developer">Developer</option>
            <option value="Designer">Designer</option>
          </select>
          <select
            type="text"
            placeholder="Select Ticket"
            className="p-2 bg-green-400 rounded border-none outline-none w-1/2 text-white placeholder-white cursor-not-allowed"
            disabled
          >
            <option selected>Select Ticket</option>
            <option value="1">Ticket 1</option>
            <option value="2">Ticket 2</option>
            <option value="3">Ticket 3</option>
            <option value="4">Ticket 4</option>
            <option value="5">Ticket 5</option>
          </select>
        </div>
        <textarea
          value={title} // Ensure `title` state is used
          onChange={(e) => setTitle(e.target.value)} // Handle title change
          placeholder="Describe your task details in max 2000 characters"
          className="p-2 bg-green-400 rounded border-none outline-none w-full h-24 text-white placeholder-white text-[15px] font-semibold"
        ></textarea>
        <div className="mt-4">
          {selectedTags.length > 0 && (
            <div className="mb-2 flex flex-wrap gap-2">
              {selectedTags.map((tag) => (
                <div
                  key={tag}
                  className="flex items-center bg-white text-orange-500 rounded-md px-2 py-1 text-sm font-bold"
                >
                  <span>{tag}</span>
                  <button
                    className="ml-2 text-red-500 hover:text-red-700"
                    onClick={() => handleRemoveTag(tag)}
                  >
                    <IoClose />
                  </button>
                </div>
              ))}
            </div>
          )}
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              {isPlay ? (
                <>
                  <FaRegCirclePause
                    className="text-3xl text-white cursor-pointer"
                    onClick={() => setIsPlaying(false)}
                  />
                  <span className="text-white ml-5 mt-1 font-bold">
                    03:38:06
                  </span>
                </>
              ) : (
                <FaRegCirclePlay
                  className="text-3xl text-white cursor-pointer"
                  onClick={handleSubmit}
                />
              )}
            </div>

            <div className="relative p-2 border border-dashed rounded-full">
              <FiTag
                className="text-xl text-white cursor-pointer"
                onClick={handleTagOpen}
              />
              {selectedTags.length > 0 && (
                <div className="absolute -top-2 -right-2 bg-orange-500 opacity-80 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {selectedTags.length}
                </div>
              )}
              {isTagOpen && (
                <div
                  id="dropdownAvatarName"
                  className="z-10 divide-y divide-gray-100 rounded-lg shadow w-48 bg-[#fff] dark:divide-gray-600 absolute right-0 bottom-14 text-gray-600"
                >
                  <div className="p-2 text-sm">
                    <input
                      className="mr-2"
                      type="checkbox"
                      id="bug"
                      checked={selectedTags.includes("Bug")}
                      onChange={() => handleTagChange("Bug")}
                    />
                    <span>Bug</span>
                  </div>
                  <div className="p-2 text-sm">
                    <input
                      className="mr-2"
                      type="checkbox"
                      id="content"
                      checked={selectedTags.includes("Content Writing")}
                      onChange={() => handleTagChange("Content Writing")}
                    />
                    <span>Content Writing</span>
                  </div>
                  <div className="p-2 text-sm">
                    <input
                      className="mr-2"
                      type="checkbox"
                      id="marketing"
                      checked={selectedTags.includes("Marketing")}
                      onChange={() => handleTagChange("Marketing")}
                    />
                    <span>Marketing</span>
                  </div>
                  <div className="p-2 text-sm">
                    <input
                      className="mr-2"
                      type="checkbox"
                      id="development"
                      checked={selectedTags.includes("Development")}
                      onChange={() => handleTagChange("Development")}
                    />
                    <span>Development</span>
                  </div>
                  <div className="p-2 text-sm">
                    <input
                      className="mr-2"
                      type="checkbox"
                      id="design"
                      checked={selectedTags.includes("Designing")}
                      onChange={() => handleTagChange("Designing")}
                    />
                    <span>Designing</span>
                  </div>
                  <div className="p-2 text-sm">
                    <input
                      className="mr-2"
                      type="checkbox"
                      id="learning"
                      checked={selectedTags.includes(
                        "Learning and Development"
                      )}
                      onChange={() =>
                        handleTagChange("Learning and Development")
                      }
                    />
                    <span>Learning and Development</span>
                  </div>
                  <div className="p-2 text-sm">
                    <input
                      className="mr-2"
                      type="checkbox"
                      id="task"
                      checked={selectedTags.includes("Task")}
                      onChange={() => handleTagChange("Task")}
                    />
                    <span>Task</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default TimelogEditor;
