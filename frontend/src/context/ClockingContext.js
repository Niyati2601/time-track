// src/context/ClockingContext.js
import React, { createContext, useState } from 'react';

export const ClockingContext = createContext();

export const ClockingProvider = ({ children }) => {
  const [isClocking, setIsClocking] = useState(false);
  const [clockInTime, setClockInTime] = useState();
  const [clockOutTime, setClockOutTime] = useState();
  const [isDayIn, setIsDayIn] = useState(false);
  const [logs, setLogs] = useState([]);


  return (
    <ClockingContext.Provider value={{ isClocking, setIsClocking, clockInTime, setClockInTime, clockOutTime, setClockOutTime ,isDayIn, setIsDayIn, logs, setLogs}}>
      {children}
    </ClockingContext.Provider>
  );
};
