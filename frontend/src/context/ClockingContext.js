// src/context/ClockingContext.js
import React, { createContext, useState, useEffect } from 'react';

export const ClockingContext = createContext();

export const ClockingProvider = ({ children }) => {
  const [isClocking, setIsClocking] = useState(() => {
    const savedIsClocking = localStorage.getItem('isClocking');
    return savedIsClocking === 'true';
  });
  const [isDayIn, setIsDayIn] = useState(() => {
    const savedIsDayIn = localStorage.getItem('isDayIn');
    return savedIsDayIn === 'true';
  });
  const [clockInTime, setClockInTime] = useState(() => {
    const savedClockInTime = localStorage.getItem('clockInTime');
    return savedClockInTime ? new Date(savedClockInTime) : null;
  });
  const [clockOutTime, setClockOutTime] = useState(null);

  useEffect(() => {
    localStorage.setItem('isClocking', isClocking);
    localStorage.setItem('isDayIn', isDayIn);
    if (clockInTime) {
      localStorage.setItem('clockInTime', clockInTime.toString());
    }
  }, [isClocking, isDayIn, clockInTime]);

  return (
    <ClockingContext.Provider value={{ isClocking, setIsClocking, clockInTime, setClockInTime, clockOutTime, setClockOutTime, isDayIn, setIsDayIn }}>
      {children}
    </ClockingContext.Provider>
  );
};
