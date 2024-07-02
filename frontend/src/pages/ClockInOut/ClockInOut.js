import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import MainButtons from '../../components/MainButtons';
import apiUrl from '../../api/Api';
import { useDispatch, useSelector } from 'react-redux';
import { setUserDetails } from '../../redux/userSlice';
import toast from 'react-hot-toast';

const ClockInOut = () => {
  const [history, setHistory] = useState([]);
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

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

  const fetchHistory = async () => {
    try {
      const response = await fetch(apiUrl.clockHistory.url, {
        method: apiUrl.clockHistory.method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user?.user?._id, 
        }),
      });

      const data = await response.json();
      if (data.success) {
        setHistory(data.history);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log('error: ', error);
      // Handle error
    }
  };

  useEffect(() => {
    fetchUserDetails();
    fetchHistory();
  }, []);

  const formatTime = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  // Function to convert duration to minutes
  const convertDurationToMinutes = (duration) => {
    const [hours, minutes] = duration.split(':').map(Number);
    return hours * 60 + minutes;
  };

  // Calculate total duration
  const totalDurationInMinutes = history.reduce((total, entry) => {
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
    <div className="flex h-screen relative">
      <Sidebar />
      <div className="flex flex-col flex-grow bg-gray-100">
        <Navbar />
        <div className="py-4 px-6 text-lg text-gray-600 font-bold text-right">
          Total Time: {formatDuration(totalDurationInMinutes)}
        </div>
        <div className="shadow-lg rounded-md overflow-hidden m-5">
          <table className="w-full top-4">
            <thead>
              <tr className="bg-blue-100">
                <th className="w-1/3 py-4 px-6 text-left text-gray-600 font-bold uppercase">In</th>
                <th className="w-1/3 py-4 px-6 text-left text-gray-600 font-bold uppercase">Out</th>
                <th className="w-1/3 py-4 px-6 text-left text-gray-600 font-bold uppercase">Time</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {history.map((entry, index) => (
                <tr key={index}>
                  <td className="py-4 px-6 border-b border-gray-200">{formatTime(entry?.clockInTime) || '-'}</td>
                  <td className="py-4 px-6 border-b border-gray-200">{formatTime(entry?.clockOutTime) || '-'}</td>
                  <td className="py-4 px-6 border-b border-gray-200">{entry.duration || '-'}</td>
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

export default ClockInOut;
