import React, { useEffect, useState } from "react";
import noData from "../../assets/noData.svg";
import { GoPlus } from "react-icons/go";
import apiUrl from "../../api/Api";
import toast from "react-hot-toast";
import moment from "moment";
import { FiWatch } from "react-icons/fi";
import { FaRegCalendar } from "react-icons/fa";

const Dashboard = () => {
  const [logs, setLogs] = useState([]);
  const [open, setOpen] = useState(false);

  const toggleModal = () => {
    setOpen(!open);
  };

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

  const handleWeekLogs = async () => {
    try {
      const res = await fetch(apiUrl.weekLogs.url, {
        method: apiUrl.weekLogs.method,
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
  }

  const handleMonthLogs = async () => {
    try {
      const res = await fetch(apiUrl.monthLogs.url, {
        method: apiUrl.monthLogs.method,
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
  }


    const totalDurationInMs = logs.reduce((total, log) => {
      if (log.duration !== "-") {
        const [hours, minutes] = log.duration.split(":").map(Number);
        return total + hours * 60 * 60 * 1000 + minutes * 60 * 1000;
      }
      return total;
    }, 0);

    const totalHours = Math.floor(totalDurationInMs / (1000 * 60 * 60))
      .toString()
      .padStart(1, "0");
    const totalMinutes = Math.floor(
      (totalDurationInMs % (1000 * 60 * 60)) / (1000 * 60)
    )
      .toString()
      .padStart(2, "0");  

    const totalDuration = `${totalHours}hr ${totalMinutes}m`;

  return (
    <div className="flex flex-col bg-gray-100 h-full p-4">
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 w-full">
        <div className="w-full md:w-1/3 p-4 bg-white rounded-lg shadow-md">
          <div className="flex justify-between items-center border-b-2">
            <h1 className="text-xl font-semibold pb-2 text-gray-500">{totalDuration}</h1>
            <button
              className=" text-blue-800  bg-blue-100 flex p-1 rounded-sm items-center gap-2 text-sm"
              onClick={toggleModal}
            >
              Today <FaRegCalendar />
            </button>
          </div>
          {open && (
            <div
              id="dropdownAvatarName"
              className="z-10 divide-y divide-gray-100 rounded-lg shadow w-48 bg-[#283046] dark:divide-gray-600 absolute right-[65%] mt-1"
            >
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownAvatarNameButton">
                <li>
                  <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white flex items-center gap-2 text-sm" onClick={handleLogs}>
                    Today
                  </button>
                </li>
              </ul>
              <div className="py-2 text-sm text-white">
                <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white flex items-center gap-2 text-sm" onClick={handleWeekLogs}>
                  This Week
                </button>
              </div>
              <div className="py-2 text-sm text-white">
                <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white flex items-center gap-2 text-sm" onClick={handleMonthLogs}>
                  This Month
                </button>
              </div>
            </div>
          )}
          {logs.length > 0 ? (
            logs.map((log, index) => (
              <div key={index} className="mt-2">
                <div className="text-gray-600 flex justify-between items-center">
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
              </div>
            ))
          ) : (
            <p className="mt-2 text-red-600">No logs for today.</p>
          )}
        </div>

        <div className="w-full md:w-1/3 p-4 bg-white rounded-lg shadow-md">
        <div>
          <h2 className="text-lg font-semibold">Card 2</h2>
          <p className="mt-2 text-gray-600">
            This is the content of the second card.
          </p>
          </div>
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