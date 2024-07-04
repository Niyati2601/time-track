// src/context/ClockingContext.js
import React, { createContext, useState } from 'react';

export const ClockingContext = createContext();

export const ClockingProvider = ({ children }) => {
  const [isClocking, setIsClocking] = useState(false);
  const [clockInTime, setClockInTime] = useState();
  const [clockOutTime, setClockOutTime] = useState();
  const [isDayIn, setIsDayIn] = useState(false);

  return (
    <ClockingContext.Provider value={{ isClocking, setIsClocking, clockInTime, setClockInTime, clockOutTime, setClockOutTime ,isDayIn, setIsDayIn}}>
      {children}
    </ClockingContext.Provider>
  );
};
