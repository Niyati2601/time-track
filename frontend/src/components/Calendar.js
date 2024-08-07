import React, { useContext, useEffect, useState } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css";
import { FaRegCalendar } from "react-icons/fa6";
import moment from "moment";
import apiUrl from "../api/Api";
import { ClockingContext } from "../context/ClockingContext";

const Calendar = () => {
  const [date, setDate] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const [dateOpen, setDateOpen] = useState(false);
  const { setLogs } = useContext(ClockingContext);

  const handleCalendar = (ranges) => {
    setDate(ranges.selection);
  };

  const toggleCalendar = () => {
    setDateOpen(!dateOpen);
  };

  useEffect(() => {
    const getCustomLogs = async () => {
      try {
        const res = await fetch(apiUrl.getCustomLogs.url, {
          method: apiUrl.getCustomLogs.method,
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            startDate: date.startDate,
            endDate: date.endDate,
          }),
        });
        const data = await res.json();
        if (data.success) {
          setLogs(data.data);
        } else {
          setLogs([]);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getCustomLogs();
  }, [date, setLogs]);


  return (
    <div className="flex justify-center align-middle h-15 relative ">
      <span className="p-[12px] border rounded-md mb-5 mr-3 bg-blue-100 text-blue-900 font-bold ">
        <button onClick={toggleCalendar} className="flex gap-3">
          {moment(date.startDate).format("MMM DD, YYYY")} -{" "}
          {moment(date.endDate).format("MMM DD, YYYY")}
          <FaRegCalendar className="text-lg mt-[1px]" />
        </button>
      </span>
      {dateOpen && (
        <DateRangePicker
          className="absolute top-20 right-10"
          ranges={[date]}
          onChange={handleCalendar}
          maxDate={new Date()}
        />
      )}
    </div>
  );
};

export default Calendar;
