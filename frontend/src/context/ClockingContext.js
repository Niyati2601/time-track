// src/context/ClockingContext.js
import React, { createContext, useState } from 'react';

export const ClockingContext = createContext();

export const ClockingProvider = ({ children }) => {
  const [isClocking, setIsClocking] = useState(false);
  const [clockInTime, setClockInTime] = useState();
  const [clockOutTime, setClockOutTime] = useState();

  return (
    <ClockingContext.Provider value={{ isClocking, setIsClocking, clockInTime, setClockInTime, clockOutTime, setClockOutTime }}>
      {children}
    </ClockingContext.Provider>
  );
};
