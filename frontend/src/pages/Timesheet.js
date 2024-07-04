import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import MainButtons from "../components/MainButtons";
import apiUrl from "../api/Api";
import { setUserDetails } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

const Timesheet = () => {
  const dispatch = useDispatch();
  const [logs, setLogs] = useState([]);

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
      toast.error(error);
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

  return (
    <div className="flex h-screen relative">
      <Sidebar />
      <div className="flex flex-col flex-grow bg-gray-100">
        <Navbar />
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
              {logs.map((log) => (
                <tr key={log._id} className="border-b border-gray-200">
                  <td className="w-1/3 py-4 px-6 text-left text-gray-600">
                    {log.title}
                    {}
                  </td>
                  <td className="w-1/3 py-4 px-6 text-left text-gray-600">
                    {log.time}
                  </td>
                  <td className="w-1/3 py-4 px-6 text-left text-gray-600">
                    {log.duration}
                  </td>
                  <td className="w-1/3 py-4 px-6 text-left text-gray-600">
                    {log.action}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <MainButtons className="absolute bottom-4 right-4" />
    </div>
  );
};

export default Timesheet;
