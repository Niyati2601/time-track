import React, { useEffect, useState } from "react";
import apiUrl from "../../api/Api";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { GoDotFill } from "react-icons/go";

const ClockInOut = () => {
  const [history, setHistory] = useState([]);
  const user = useSelector((state) => state.user);


  const fetchHistory = async () => {
    try {
      const response = await fetch(apiUrl.clockHistory.url, {
        method: apiUrl.clockHistory.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user?.user?._id,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setHistory(data.history);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user?.user?._id) {
      fetchHistory(); 
    }
  }, [user]);

  const formatTime = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const isSameDate = (date1, date2) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const todayHistory = history.filter((entry) => {
    const clockInDate = new Date(entry.clockInTime);
    return isSameDate(clockInDate, new Date());
  });
  const convertDurationToMinutes = (duration) => {
    const [hours, minutes] = duration.split(":").map(Number);
    return hours * 60 + minutes;
  };

  const totalDurationInMinutes = todayHistory.reduce((total, entry) => {
    if (entry.duration) {
      return total + convertDurationToMinutes(entry.duration);
    }
    return total;
  }, 0);

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <>
      <div className="py-4 px-6 text-lg text-gray-600 font-bold text-right">
        Total Time:{" "}
        <span className="text-red-600">
          {formatDuration(totalDurationInMinutes)}
        </span>
      </div>
      <div className="shadow-lg rounded-md overflow-hidden m-2">
        <table className="w-full top-2">
          <thead>
            <tr className="bg-blue-100">
              <th className="w-1/3 py-4 px-6 text-left text-gray-600 font-bold uppercase">
                In
              </th>
              <th className="w-1/3 py-4 px-6 text-left text-gray-600 font-bold uppercase">
                Out
              </th>
              <th className="w-1/3 py-4 px-6 text-left text-gray-600 font-bold uppercase">
                Time
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {todayHistory.map((entry, index) => (
              <tr key={index}>
                <td className="py-4 px-6 border-b border-gray-200 ">
                  <span className="flex">
                    <GoDotFill className="text-green-600 mr-2 text-xl" />
                    {formatTime(entry?.clockInTime) || "-"}
                  </span>
                </td>
                <td className="py-4 px-6 border-b border-gray-200 ">
                  <span className="flex">
                    {entry?.clockOutTime && (
                      <GoDotFill className="text-red-600 mr-2 text-xl" />
                    )}
                    {formatTime(entry?.clockOutTime) || "-"}
                  </span>
                </td>
                <td className="py-4 px-6 border-b border-gray-200">
                  {entry.duration || "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ClockInOut;
