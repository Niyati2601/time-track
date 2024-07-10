import React, { useEffect, useState } from "react";
import apiUrl from "../api/Api";
import { setUserDetails } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import moment from "moment";
import { BiSolidEdit } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import { IoDocumentOutline } from "react-icons/io5";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import noData from "../assets/noData.svg";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { FiDownload } from "react-icons/fi";
import Calendar from "../components/Calendar";

const Timesheet = () => {
  const dispatch = useDispatch();
  const [logs, setLogs] = useState([]);
  const [projects, setProjects] = useState([]);
  const [tags, setTags] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editLogData, setEditLogData] = useState({
    _id: "",
    title: "",
    projects: "",
    tags: [],
    startTIme: new Date(),
    endTIme: new Date(),
  });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteLogId, setDeleteLogId] = useState(null);

  const getAllLogsApi = async () => {
    try {
      const res = await fetch(apiUrl.getAllLogs.url, {
        method: apiUrl.getAllLogs.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
      });
      const data = await res.json();

      if (data.success) {
        setLogs(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

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
    getAllLogsApi();
    fetchUserDetails();
    fetchProjects();
    fetchTags();
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

  const formatTime = (dateString) => {
    if (!dateString) {
      return "";
    } else {
      return moment(dateString).format("hh:mm a");
    }
  };

  const deleteLogApi = async (id) => {
    try {
      const res = await fetch(apiUrl.deleteLog.url, {
        method: apiUrl.deleteLog.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          _id: id,
        }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(data.message);
        getAllLogsApi();
        setIsDeleteModalOpen(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const handleEditClick = (log) => {
    setEditLogData({
      ...log,
      startTIme: new Date(log.startTIme),
      endTIme: new Date(log.endTIme),
    });
    setIsModalOpen(true);
  };

  const handleDeleteClick = (logId) => {
    setDeleteLogId(logId);
    setIsDeleteModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditLogData({
      ...editLogData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    let updatedTags = [...editLogData.tags];

    if (checked) {
      updatedTags.push(name);
    } else {
      updatedTags = updatedTags.filter((tag) => tag !== name);
    }

    setEditLogData({
      ...editLogData,
      tags: updatedTags,
    });
  };

  const handleStartTimeChange = (date) => {
    setEditLogData((prevState) => ({
      ...prevState,
      startTIme: date,
    }));
  };

  const handleEndTimeChange = (date) => {
    setEditLogData((prevState) => ({
      ...prevState,
      endTIme: date,
    }));
  };

  const saveEditLogApi = async () => {
    try {
      const res = await fetch(apiUrl.editLog.url, {
        method: apiUrl.editLog.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          ...editLogData,
          startTIme: editLogData.startTIme.toISOString(),
          endTIme: editLogData.endTIme.toISOString(),
        }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(data.message);
        getAllLogsApi();
        setIsModalOpen(false); // Close modal
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const groupLogsByDate = (logs) => {
    const groupedLogs = {};

    logs.forEach((log) => {
      const formattedDate = moment(log.createdAt).format("MMM DD, YYYY");
      if (!groupedLogs[formattedDate]) {
        groupedLogs[formattedDate] = { logs: [], totalDuration: 0 };
      }
      groupedLogs[formattedDate].logs.push(log);

      // Assuming log.duration is in a format that moment.js can parse (e.g., "HH:mm")
      groupedLogs[formattedDate].totalDuration += moment
        .duration(log.duration)
        .asMinutes();
    });

    return groupedLogs;
  };

  const groupedLogs = groupLogsByDate(logs);

  const formatDuration = (minutes) => {
    const duration = moment.duration(minutes, "minutes");
    const hours = Math.floor(duration.asHours());
    const mins = duration.minutes();
    return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
  };

  const handlePdfDownload = () => {
    const doc = new jsPDF();
    const title = "TimeTrack Report";
    const padding = 10;
    const titleWidth = doc.getTextWidth(title);
    const center = doc.internal.pageSize.width / 2 - titleWidth / 2;

    doc.text(title, center, padding);

    doc.autoTable({
      head: [["S.No", "Task", "Date", "Start Time", "End Time", "Duration"]],
      body: logs.map((log, i) => [
        i + 1,
        log.title,
        moment(log.createdAt).format("MMM DD, YYYY"),
        moment(log.startTIme).format("hh:mm A"),
        log.endTIme ? moment(log.endTIme).format("hh:mm A") : "-",
        log.duration,
      ]),
    });

    doc.save("TimeTrack.pdf");
  };

  return (
    <>
      {logs.length > 0 && (
        <>
          <div className="flex justify-end">
            <Calendar />
            <button
              onClick={() => handlePdfDownload()}
              className="bg-[#283046] text-white px-4 py-2 rounded-md mb-5 float-right"
            >
              <FiDownload className="text-xl" />
            </button>
          </div>
        </>
      )}
      <div className="shadow-lg rounded-md m-5">
        {logs.length === 0 ? (
          <div className="p-4 text-lg text-gray-600 font-bold text-center">
            <img
              src={noData}
              alt="image-no-data"
              style={{ width: "45%" }}
              className="mx-auto"
            />
          </div>
        ) : (
          Object.keys(groupedLogs).map((date) => (
            <div key={date} className="mb-8 m-4">
              <div className="flex justify-between">
                <h2 className="text-xl font-bold text-orange-600 uppercase">
                  {date} {formatDuration(groupedLogs[date].totalDuration)}
                </h2>
              </div>

              <table className="w-full top-4 border border-blue-300">
                <thead>
                  <tr className="bg-blue-100">
                    <th className="w-1/3 py-4 px-6 text-left text-gray-600 font-bold uppercase">
                      Task
                    </th>
                    <th className="w-1/3 py-4 px-6 text-left text-gray-600 font-bold uppercase">
                      Time
                    </th>
                    <th className="w-1/3 py-4 px-6 text-left text-gray-600 font-bold uppercase">
                      Duration
                    </th>
                    <th className="w-1/3 py-4 px-6 text-left text-gray-600 font-bold uppercase">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {groupedLogs[date].logs.map((log) => (
                    <tr key={log._id} className="border-b border-gray-200">
                      <td className="w-1/3 px-6 text-left text-gray-600">
                        <p className="text-lg"> {log.title}</p>
                        <p className="text-red-500 inline-flex">
                          <IoDocumentOutline className="text-md mt-1 space-x-2" />
                          {log.projects}
                        </p>
                        <div className="flex">
                          {log.tags.map((tag) => (
                            <p
                              key={tag}
                              className="text-white bg-green-500 p-1 rounded-md m-1"
                            >
                              {tag}
                            </p>
                          ))}
                        </div>
                      </td>
                      <td className="w-1/3 px-6 text-left text-gray-600">
                        {formatTime(log.startTIme)} - {formatTime(log.endTIme)}
                      </td>
                      <td className="w-1/3 py-2 px-6 text-left text-gray-600">
                        {log.duration}
                      </td>
                      <td className="py-4 px-6 border-t border-gray-300">
                        <div className="flex space-x-4">
                          <button
                            onClick={() => handleEditClick(log)}
                            className="flex items-center justify-center w-10 h-10 text-green-600 rounded-full hover:bg-green-200"
                          >
                            <BiSolidEdit size={24} />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(log._id)}
                            className="flex items-center justify-center w-10 h-10 text-red-600 rounded-full hover:bg-red-200"
                          >
                            <MdDeleteOutline size={24} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))
        )}

        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Edit Log</h2>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Title
                </label>
                <textarea
                  type="text"
                  rows={3}
                  name="title"
                  value={editLogData.title}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 p-2 rounded-lg text-scroll overflow-auto"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Project
                </label>
                <select
                  name="projects"
                  value={editLogData.projects}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 p-2 rounded-lg"
                >
                  <option value="">Select Project</option>
                  {projects.map((project) => (
                    <option key={project._id} value={project.name}>
                      {project.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Tags
                </label>
                <div className="flex flex-wrap">
                  {tags.map((tag) => (
                    <label key={tag._id} className="mr-4">
                      <input
                        type="checkbox"
                        name={tag.name}
                        checked={editLogData.tags.includes(tag.name)}
                        onChange={handleCheckboxChange}
                        className="mr-2"
                      />
                      {tag.name}
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex gap-3">
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">
                    Start Time
                  </label>
                  <DatePicker
                    selected={editLogData.startTIme}
                    onChange={handleStartTimeChange}
                    showTimeSelect
                    showTimeSelectOnly
                    dateFormat="hh:mm aa"
                    className="w-full border border-gray-300 p-2 rounded-lg"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">
                    End Time
                  </label>
                  <DatePicker
                    selected={editLogData.endTIme}
                    onChange={handleEndTimeChange}
                    showTimeSelectOnly
                    showTimeSelect
                    dateFormat="hh:mm aa"
                    className="w-full border border-gray-300 p-2 rounded-lg"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <button
                  onClick={saveEditLogApi}
                  className="bg-[#283046] text-white px-4 py-2 rounded-md"
                >
                  Save
                </button>
                <button
                  onClick={closeModal}
                  className="bg-red-500 text-white px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {isDeleteModalOpen && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/4">
              <h2 className="text-2xl mb-4 text-left">
                Are you sure you want to delete this Log?
              </h2>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => deleteLogApi(deleteLogId)}
                  className="bg-[#283046] text-white px-4 py-2 rounded-md"
                >
                  Delete
                </button>
                <button
                  onClick={closeDeleteModal}
                  className="bg-red-500 text-white px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Timesheet;
