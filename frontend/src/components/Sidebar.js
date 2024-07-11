import React, { useState, useContext, useEffect } from "react";
import logo from "../assets/logo.png";
import { IoHomeOutline } from "react-icons/io5";
import { FaRegClock } from "react-icons/fa";
import { MdOutlineTimer } from "react-icons/md";
import { LuTimerOff } from "react-icons/lu";
import { IoCalendarClearOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { ClockingContext } from "../context/ClockingContext";
import apiUrl from "../api/Api";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import moment from "moment";

const sidebarItems = [
  { icon: <IoHomeOutline />, text: "Home", onClick: "/home" },
  { icon: <FaRegClock />, text: "Clock In/Out", onClick: "/clockInOut" },
  {
    icon: <IoCalendarClearOutline />,
    text: "Timesheet",
    onClick: "/timesheet",
  },
];

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [dayInTime, setDayInTime] = useState(null);
  const [selectedItem, setSelectedItem] = useState(0);
  const { isClocking, setIsClocking, isDayIn, setIsDayIn } =
    useContext(ClockingContext);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    const storedDayInTime = localStorage.getItem("dayInTime");
    if (storedDayInTime) {
      setDayInTime(storedDayInTime);
      setIsDayIn(true);
      setIsClocking(true);
    }
  }, []);

  const handleClick = (onClick, index) => {
    setSelectedItem(index);
    handleNavigation(onClick);
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleDayInOut = () => {
    if (!isDayIn) {
      setIsClocking(true);
      handleDayInApi();
    } else {
      setIsClocking(false);
      handleDayOutApi();
      setIsDayIn(false);
      setDayInTime(null);
      localStorage.removeItem("dayInTime");
    }
  };

  const handleDayInApi = async () => {
    try {
      const res = await fetch(apiUrl.dayIn.url, {
        method: apiUrl.dayIn.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          userId: user?.user?._id,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setIsDayIn(true);
        setDayInTime(new Date());
        localStorage.setItem("dayInTime", new Date());
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDayOutApi = async () => {
    try {
      const res = await fetch(apiUrl.dayOut.url, {
        method: apiUrl.dayOut.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          userId: user?.user?._id,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setIsDayIn(false);
        setDayInTime(null);
        localStorage.removeItem("dayInTime");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const formattedTime = (time) => {
    return moment(time).format("hh:mm A");
  };

  return (
    <div
      className={`flex flex-col bg-[#283046] text-white h-screen transition-width duration-300 ease-in-out ${
        isExpanded ? "w-64" : "w-20"
      }`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Logo */}
      <div className="flex items-center my-4 px-4">
        <img src={logo} alt="Logo" className="w-14 h-14" />
        <span
          className={`ml-4 text-xl font-semibold ${
            isExpanded ? "block" : "hidden"
          }`}
        >
          TimeTrack
        </span>
      </div>

      {/* Sidebar Items */}
      {sidebarItems.map((item, index) => (
        <div
          key={index}
          className={`my-4 flex items-center w-full px-4 p-4 ${
            selectedItem === index ? "p-3 bg-[#283062]" : "hover:bg-[#283065]"
          }`}
          onClick={() => handleClick(item.onClick, index)}
        >
          <span className="text-2xl relative">{item.icon}</span>
          <span className={`ml-4 ${isExpanded ? "block" : "hidden"}`}>
            {item.text}
          </span>
        </div>
      ))}

      {/* Day In and Day Out Buttons */}
      <div className="mt-auto px-4 py-2">
        <button
          className={`flex items-center text-center justify-center bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded ${
            isExpanded ? "w-full" : "w-12 justify-center"
          }`}
          onClick={handleDayInOut}
        >
          {isDayIn ? (
            <>
              <LuTimerOff className="text-xl text-center" />
              <span
                className={`ml-2 text-center ${
                  isExpanded ? "block" : "hidden"
                }`}
              >
                Day Out
              </span>
            </>
          ) : (
            <>
              <MdOutlineTimer className="text-xl text-center" />
              <span
                className={`ml-2 text-center ${
                  isExpanded ? "block" : "hidden"
                }`}
              >
                Day In
              </span>
            </>
          )}
        </button>
        {isDayIn && (
          <div
            className={`flex items-center text-center bg-white hover:bg-white text-gray-400 font-bold py-2 px-4 rounded mt-2 ${
              isExpanded ? "block" : "hidden"
            }`}
          >
            <span
              className={`text-center text-[#283046] text-[13px] font-semibold m-auto`}
            >
              Day in at {formattedTime(dayInTime)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
