import React, { useContext, useEffect, useRef, useState } from "react";
import { FaRegCirclePlay, FaRegCirclePause } from "react-icons/fa6";
import { FiTag } from "react-icons/fi";
import { MdOutlineTimer } from "react-icons/md";
import { RxDividerVertical } from "react-icons/rx";
import { FiEdit } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import toast from "react-hot-toast";
import apiUrl from "../api/Api";
import { useSelector } from "react-redux";
import { ClockingContext } from "../context/ClockingContext";

const TimelogEditor = ({ onOpen, onClose }) => {
  const [isPlay, setIsPlaying] = useState(false);
  const [isTagOpen, setIsTagOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(""); // Initialize with an empty string or appropriate default value
  const [tags, setTags] = useState([]);
  const [title, setTitle] = useState("");
  const [logId, setLogId] = useState("");
  const [time, setTime] = useState(0);
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState("");

  const user = useSelector((state) => state.user);
  const { isClocking, setIsClocking } = useContext(ClockingContext);

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
      if (!projects || !title || !selectedTags.length) {
        return;
      }
      setIsPlaying(!isPlay);
      setTime(0);
      const res = await fetch(apiUrl.timelog.url, {
        method: apiUrl.timelog.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          user: user.user._id,
          projects: selectedProject,
          title,
          tags: selectedTags,
        }),
      });
      const data = await res.json();
      setLogId(data.data._id);
      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleEndTimeApi = async () => {
    try {
      console.log("Request payload:", {
        _id: logId,
        endTIme: new Date().toISOString(),
      });

      const res = await fetch(apiUrl.updateEndTime.url, {
        method: apiUrl.updateEndTime.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          _id: logId,
          endTIme: new Date().toISOString(),
        }),
      });

      const data = await res.json();

      if (res.status === 200) {
        setIsPlaying(false);
        toast.success(data.message);
      } else {
        console.log(data.message || "An error occurred");
      }
    } catch (error) {
      toast.error(error.message || "An unexpected error occurred");
    }
  };

  useEffect(() => {
    if (!isClocking) {
      handleEndTimeApi();
    }
  }, [isClocking]);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600).toString().padStart(2, "0");
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  useEffect(() => {
    let interval = null;
    if (isPlay) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (!isPlay && time !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlay, time]);

  useEffect(() => {
    fetchProjects();
    fetchTags();
    fetchTickets();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch(apiUrl.getProjects.url, {
        method: apiUrl.getProjects.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
      });
      const data = await res.json();
      if (data.success) {
        setProjects(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchTags = async () => {
    try {
      const res = await fetch(apiUrl.getTags.url, {
        method: apiUrl.getTags.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
      });
      const data = await res.json();
      if (data.success) {
        setTags(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchTickets = async () => {
    try {
      const res = await fetch(apiUrl.getTickets.url, {
        method: apiUrl.getTickets.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
      });
      const data = await res.json();
      if (data.success) {
        setTickets(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    onOpen &&
    isClocking && (
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
           value={selectedProject}
           onChange={(e) => setSelectedProject(e.target.value)}
            type="text"
            placeholder="Select Projects"
            className={`p-2 bg-green-400 rounded border-none outline-none w-1/2 text-white placeholder-white mr-1 ${isPlay ? "cursor-not-allowed" : "cursor-pointer"
              }`}
            disabled={isPlay}
            name="projects"
            required
          >
            <option>Select Projects</option>
            {Array.isArray(projects) && projects.length > 0 ? (
              projects.map((project) => {
                console.log('project: ', project);
                return (
                <option key={project._id} value={project.name}>
                  {project.name}
                </option>
              )})
            ) : (
              <option disabled>No projects found</option>
            )}

          </select>
          <select
            value={selectedTicket}
            onChange={(e) => setSelectedTicket(e.target.value)}
            type="text"
            placeholder="Select Ticket"
            className="p-2 bg-green-400 rounded border-none outline-none w-1/2 text-white placeholder-white cursor-not-allowed"
            disabled
          >
            <option>Select Ticket</option>
            {Array.isArray(tickets) && tickets.length > 0 ? (
              tickets.map((ticket) => (
                <option key={ticket._id} value={ticket.name}>
                  {ticket.name}
                </option>
              ))
            ) : (
              <option disabled>No tickets found</option>
            )}
          </select>
        </div>
        <textarea
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Describe your task details in max 2000 characters"
          className="p-2 bg-green-400 rounded border-none outline-none w-full h-24 text-white placeholder-white text-[15px] font-semibold text-scroll overflow-auto"
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
                  {!isPlay && (
                    <button
                      className="ml-2 text-red-500 hover:text-red-700"
                      onClick={() => handleRemoveTag(tag)}
                    >
                      <IoClose />
                    </button>
                  )}
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
                    onClick={handleEndTimeApi}
                  />
                  <span className="text-white ml-5 mt-1 font-bold">
                    {formatTime(time)}
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
              {isTagOpen && !isPlay && (
                <div className="z-10 divide-y divide-gray-100 rounded-lg shadow w-48 bg-[#fff] dark:divide-gray-600 absolute right-0 bottom-14 text-gray-600">
                  {tags && tags.map((tag) => (
                    <div key={tag._id} className="p-2 text-sm">
                      <input
                        className="mr-2"
                        type="checkbox"
                        id={tag.name}
                        checked={selectedTags.includes(tag.name)}
                        onChange={() => handleTagChange(tag.name)}
                      />
                      <span>{tag.name}</span>
                    </div>
                  ))}
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
