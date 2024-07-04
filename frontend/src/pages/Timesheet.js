import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import MainButtons from "../components/MainButtons";
import apiUrl from "../api/Api";
import { setUserDetails } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import moment from "moment";
import { BiSolidEdit } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";

const Timesheet = () => {
  const dispatch = useDispatch();
  const [logs, setLogs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editLogData, setEditLogData] = useState({ _id: "", title: "", projects: "", tags: "" });

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
  }, []);

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
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const handleEditClick = (log) => {
    setEditLogData(log);
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditLogData({
      ...editLogData,
      [name]: value,
    });
  };

  const saveEditLogApi = async () => {
    try {
      const res = await fetch(apiUrl.editLog.url, {
        method: apiUrl.editLog.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(editLogData),
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

  return (
    <div className="shadow-lg rounded-md overflow-hidden m-5">
      <table className="w-full top-4">
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
          {console.log("logs: ", logs)}
          {logs.map((log) => (
            
            <tr key={log._id} className="border-b border-gray-200">
              <td className="w-1/3 px-6 text-left text-gray-600">{log.title}</td>
              <td className="w-1/3 px-6 text-left text-gray-600">
                {formatTime(log.startTIme)} - {formatTime(log.endTIme)}
              </td>
              <td className="w-1/3 py-2  px-6 text-left text-gray-600">{log.duration}</td>
              <td className="w-1/3 py-2 px-6 text-left text-gray-600">
                <div className="w-1/3 py-2 space-x-2 text-center flex justify-between cursor-pointer">
                  <BiSolidEdit
                    style={{ fontSize: '5rem' }}
                    onClick={() => handleEditClick(log)}
                  />
                  <MdDeleteOutline
                    style={{ fontSize: '5rem', color: '#ea5455' }}
                    onClick={() => deleteLogApi(log._id)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl mb-4">Edit Log</h2>
            <label className="block mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={editLogData.title}
              onChange={handleInputChange}
              className="border p-2 mb-4 w-full"
            />
            <label className="block mb-2">Projects</label>
            <input
              type="text"
              name="projects"
              value={editLogData.projects}
              onChange={handleInputChange}
              className="border p-2 mb-4 w-full"
            />
            <label className="block mb-2">Tags</label>
            <input
              type="text"
              name="tags"
              value={editLogData.tags}
              onChange={handleInputChange}
              className="border p-2 mb-4 w-full"
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={saveEditLogApi}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                Save
              </button>
              <button
                onClick={closeModal}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Timesheet;
