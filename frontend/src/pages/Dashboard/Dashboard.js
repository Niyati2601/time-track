import React, { useEffect, useState } from "react";
import noData from "../../assets/noData.svg";
import { GoPlus } from "react-icons/go";
import apiUrl from "../../api/Api";
import toast from "react-hot-toast";
import moment from "moment";
import { FiWatch } from "react-icons/fi";

const Dashboard = () => {
  const [logs, setLogs] = useState([]);

  const handleLogs = async () => {
    try {
      const res = await fetch(apiUrl.getLogs.url, {
        method: apiUrl.getLogs.method,
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

  const formatDateAndTime = (date) => {
    return moment(date).format("hh:mm a");
  };

  useEffect(() => {
    handleLogs();
  }, []);

  return (
    <div className="flex flex-col bg-gray-100 min-h-screen p-4">
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 w-full">
        <div className="w-full md:w-1/3 p-4 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-semibold border-b-2 pb-2">Activity Logs</h1>
          {logs.length > 0 ? (
            logs.map((log, index) => (
              <>
                <div
                  key={index}
                  className="mt-2 text-gray-600 flex justify-between items-center"
                >
                  <div className="flex items-center">
                    <div className="bg-gray-200 rounded-full mr-2 p-2 text-md">
                      <FiWatch />
                    </div>
                    <p>{log.title}</p>
                  </div>
                  <p className="text-sm text-gray-500 font-semibold">
                    {formatDateAndTime(log.createdAt)}
                  </p>
                </div>
                <div className="text-sm ml-10 text-red-500">{log.projects}</div>
              </>
            ))
          ) : (
            <p className="mt-2 text-gray-600">No logs for today.</p>
          )}
        </div>
        <div className="w-full md:w-1/3 p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Card 2</h2>
          <p className="mt-2 text-gray-600">
            This is the content of the second card.
          </p>
        </div>
        <div className="w-full md:w-1/3 p-4 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl text-gray-600 font-semibold border-b-2 pb-2">
            Activity Logs
          </h1>
          <div className="flex justify-center items-center mt-4">
            <img src={noData} alt="image-no-data" style={{ width: "70%" }} />
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/2 p-4 bg-white rounded-lg shadow-md mt-4">
        <h1 className="text-2xl text-gray-600 font-semibold border-b-2 pb-2">
          Projects WatchList
        </h1>
        <div className="flex flex-col items-center">
          <button className="flex items-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4">
            <GoPlus className="mr-2" />
            Add Project
          </button>
          <p className="mt-2 text-gray-600 text-center">
            Customize your watchlist by adding projects based on your
            preference.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;