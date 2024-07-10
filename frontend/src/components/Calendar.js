import React, { useState } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; 
import { FaRegCalendar } from "react-icons/fa6";
import moment from "moment";

const Calendar = () => {
  const [date, setDate] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const [dateOpen,setDateOpen] = useState(false)

  const handleCalendar = (ranges) => {
    setDate(ranges.selection);
  };

  const toggleCalendar = ()=>{
    setDateOpen(!dateOpen);
  }
  return (
    <div className="flex justify-center align-middle h-15 relative ">
      <span className="p-[12px] border rounded-md mb-5 mr-3 bg-blue-100 text-blue-900 font-bold ">
        <button onClick={toggleCalendar} className="flex gap-3">
          {moment(date.startDate).format("MMM DD, YYYY")} -{" "}
          {moment(date.endDate).format("MMM DD, YYYY")}
          <FaRegCalendar className="text-lg mt-[1px]"/>
        </button>
      </span>
      {dateOpen &&
      <DateRangePicker
        className="absolute top-20 right-10"
        ranges={[date]}
        onChange={handleCalendar}
      />}
    </div>
  );
};

export default Calendar;
