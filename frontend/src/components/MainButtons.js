// src/components/MainButtons.js
import React, { useState, useEffect, useContext } from 'react';
import { FaRegPauseCircle } from "react-icons/fa";
import { MdOutlineTimer } from "react-icons/md";
import { MdOutlinePlayCircleOutline } from "react-icons/md";
import Timer from "easytimer.js";
import TimelogEditor from './TimelogEditor';
import { ClockingContext } from '../context/ClockingContext';
import apiUrl from '../api/Api';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

const MainButtons = ({ className }) => {
  const { isClocking, setIsClocking  } = useContext(ClockingContext);
  const [timer] = useState(new Timer());
  const [time, setTime] = useState('00:00:00');
  const [savedTime, setSavedTime] = useState(null);
  const [isTimeLogOpen, setIsTimeLogOpen] = useState(false);
  const user = useSelector(state => state.user)

  const toggleLogModal = () => {
    setIsTimeLogOpen(!isTimeLogOpen);
  };

  useEffect(() => {
    timer.addEventListener('secondsUpdated', () => {
      setTime(timer.getTimeValues().toString());
    });

    return () => {
      timer.stop();
    };
  }, [timer]);

  const handleClockIn = async () => {
    try {
      const response = await fetch(apiUrl.clockIn.url, {
        method: apiUrl.clockIn.method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user?.user?._id, // Replace with actual user ID
        }),
      });
      const data = await response.json();
      if (data.success) {
        toast.success(data.message);
        if (savedTime) {
          const timeParts = savedTime.split(':');
          timer.start({
            startValues: {
              hours: parseInt(timeParts[0], 10),
              minutes: parseInt(timeParts[1], 10),
              seconds: parseInt(timeParts[2], 10),
            },
          });
          
        } else {
          timer.start();
        }
        setIsClocking(true);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Failed to clock in. Please try again.');
    }
  };

  const handleClockOut = async () => {
    try {
      const response = await fetch(apiUrl.clockOut.url, {
        method: apiUrl.clockOut.method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user?.user?._id, // Replace with actual user ID
        }),
      });
      const data = await response.json();
      if (data.success) {
        toast.success(data.message);
        timer.stop();
        setSavedTime(time);
        setIsClocking(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Failed to clock out. Please try again.');
    }
  };

  useEffect(() => {
    if (isClocking) {
      handleClockIn();
    } else if (savedTime) {
      handleClockOut();
    }
  }, [isClocking]);

  return (
    <div className={`flex justify-end items-center ${className}`}>
      <button
        className="flex items-center bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-1"
        onClick={() => toggleLogModal()}
      >
        <MdOutlineTimer className="text-xl mr-1" />
        Time log
      </button>
      {!isClocking ? (
        <button
          className="flex items-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          onClick={handleClockIn}
        >
          <MdOutlinePlayCircleOutline className="text-xl mb-1" />
          Clock In
        </button>
      ) : (
        <div className="flex items-center bg-red-500  text-white p-2 rounded">
          <FaRegPauseCircle className="text-xl mr-1" />
          <button
            className="flex flex-col items-center bg-red-500 text-white font-bold rounded mr-1 text-md"
            onClick={handleClockOut}
          >
            Clock Out
            <span className="text-sm font-semibold">{time}</span>
          </button>
        </div>
      )}
      <TimelogEditor onOpen={isTimeLogOpen} onClose={toggleLogModal} />
    </div>
  );
};

export default MainButtons;
