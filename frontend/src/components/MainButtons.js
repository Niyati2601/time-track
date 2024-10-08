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
  const { isClocking, setIsClocking, isDayIn, clockInTime, setClockInTime } = useContext(ClockingContext);
  const [timer] = useState(new Timer());
  const [time, setTime] = useState('00:00:00');
  const [isTimeLogOpen, setIsTimeLogOpen] = useState(false);
  const user = useSelector(state => state.user);

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

  useEffect(() => {
    if (isDayIn && isClocking) {
      const startTime = clockInTime ? new Date(clockInTime) : new Date();
      const elapsedTime = Math.floor((new Date() - startTime) / 1000);
      timer.start({ startValues: { seconds: elapsedTime } });
    }
    // eslint-disable-next-line
  }, [isDayIn]);

  useEffect(() => {
   if(isClocking === false) {
    handleClockOut();
   } else {
    handleClockIn(user?.user?._id);
   }
   // eslint-disable-next-line
  }, [isDayIn]);

  const handleClockIn = async () => {
    try {
      const response = await fetch(apiUrl.clockIn.url, {
        method: apiUrl.clockIn.method,
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
        toast.success(data.message);
        timer.start();
        setClockInTime(new Date());
        setIsClocking(true);
      } else {
        // toast.error(data.message);
        console.error(data.message);
      }
    } catch (error) {
      // toast.error('Failed to clock in. Please try again.');
      console.error('Failed to clock in. Please try again.', error);
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
          userId: user?.user?._id, 
        }),
      });
      const data = await response.json();
      if (data.success) {
        toast.success(data.message);
        timer.stop();
        setIsClocking(false);
        setClockInTime(null);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Failed to clock out. Please try again.');
      console.error('Failed to clock out. Please try again.', error);
    }
  };
  useEffect(() => {
    if (!isDayIn) {
      handleClockOut();
    }
  },[isDayIn])



  return (
    <div className={`flex justify-end items-center ${className}`}>
      <button
        className="flex items-center bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-1"
        onClick={toggleLogModal}
      >
        <MdOutlineTimer className="text-xl mr-1" />
        Time log
      </button>
      {!isClocking ? (
        <button
          className="flex items-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          onClick={handleClockIn}
          disabled={!isDayIn}
        >
          <MdOutlinePlayCircleOutline className="text-xl mb-1" />
          Clock In
        </button>
      ) : (
        <div className="flex items-center bg-red-500 text-white p-2 rounded">
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
