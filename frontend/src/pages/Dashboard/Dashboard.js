import React, { useEffect, useRef, useState } from "react";
import noData from "../../assets/noData.svg";
import { GoPlus } from "react-icons/go";
import apiUrl from "../../api/Api";
import toast from "react-hot-toast";
import { FiWatch } from "react-icons/fi";
import { FaRegCalendar } from "react-icons/fa";
import Select from "react-select";
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';


const Dashboard = () => {
  const [logs, setLogs] = useState([]);
  const [open, setOpen] = useState(false);
  const [label, setlabel] = useState("Today");
  const [addProjectModal, setAddProjectModal] = useState(false);
  const [projects, setProjects] = useState([]);
  const [selected, setSelected] = useState([]);
  console.log("selected: ", selected);
  const [addedItems, setAddedItems] = useState([]);
  console.log("addedItems: ", addedItems);

  const dropdownRef = useRef(null);

  const toggleModal = () => {
    setOpen(!open);
  };

  const handleLogs = async () => {
    try {
      const res = await fetch(apiUrl.getLogs.url, {
        method: apiUrl.getLogs.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
      });
      const data = await res.json();
      if (data.success) {
        setLogs(data.data);
        setlabel("Today");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    handleLogs();
  }, []);

  const handleWeekLogs = async () => {
    try {
      const res = await fetch(apiUrl.weekLogs.url, {
        method: apiUrl.weekLogs.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
      });
      const data = await res.json();
      if (data.success) {
        setLogs(data.data);
        setlabel("This Week");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleMonthLogs = async () => {
    try {
      const res = await fetch(apiUrl.monthLogs.url, {
        method: apiUrl.monthLogs.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
      });
      const data = await res.json();
      if (data.success) {
        setLogs(data.data);
        setlabel("This Month");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const totalDurationInMs = logs.reduce((total, log) => {
    if (log.duration !== "-") {
      const [hours, minutes] = log.duration.split(":").map(Number);
      return total + hours * 60 * 60 * 1000 + minutes * 60 * 1000;
    }
    return total;
  }, 0);

  const totalHours = Math.floor(totalDurationInMs / (1000 * 60 * 60))
    .toString()
    .padStart(1, "0");
  const totalMinutes = Math.floor(
    (totalDurationInMs % (1000 * 60 * 60)) / (1000 * 60)
  )
    .toString()
    .padStart(2, "0");

  const totalDuration = `${totalHours}hr ${totalMinutes}m`;

  const durationFormat = (duration) => {
    if (duration === "-") {
      return "-";
    } else {
      const durationParts = duration.split(":");
      if (durationParts.length !== 2) {
        return "-";
      } else {
        const hours = parseInt(durationParts[0].replace("hr", ""), 10) || 0;
        const minutes = parseInt(durationParts[1].replace("m", ""), 10) || 0;

        return `${hours}hr ${minutes}m`;
      }
    }
  };

  const groupLogsByProject = (logs) => {
    const projectLogs = logs.reduce((acc, log) => {
      if (!acc[log.projects]) {
        acc[log.projects] = { totalDuration: 0, logs: [] };
      }
      if (log.duration !== "-") {
        const [hours, minutes] = log.duration.split(":").map(Number);
        acc[log.projects].totalDuration +=
          hours * 60 * 60 * 1000 + minutes * 60 * 1000;
      }
      acc[log.projects].logs.push(log);
      return acc;
    }, {});

    return Object.entries(projectLogs).map(([project, data]) => ({
      project,
      totalDuration: data.totalDuration,
      logs: data.logs,
    }));
  };

  const groupedLogs = groupLogsByProject(logs);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const toggleAddProjectModal = () => {
    setAddProjectModal(!addProjectModal);
  };

  const onRequestClose = () => {
    setAddProjectModal(false);
  };

  const fetchProjects = async () => {
    try {
      const res = await fetch(apiUrl.getProjectsByUserId.url, {
        method: apiUrl.getProjectsByUserId.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
      });
      const data = await res.json();
      if (data.success) {
        const formattedProjects = data.data
          .filter((project) => project.type === "personal")
          .map((project) => ({
            value: project._id,
            label: project.name,
          }));
        setProjects(formattedProjects);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (addProjectModal) {
      fetchProjects();
    }
  }, [addProjectModal, selected]);

  const handleProjectChange = (selectedOption) => {
    setSelected(selectedOption);
  };

  const handleAddProject = async () => {
    if (selected) {
      setAddedItems([...addedItems, selected]);
      setAddProjectModal(false);
    }
  };

  const DraggableProject = ({ project, index, moveProject }) => {
    const [, ref] = useDrag({
      type: "PROJECT",
      item: { index },
    });

    const [, drop] = useDrop({
      accept: "PROJECT",
      hover: (item) => {
        if (item.index !== index) {
          moveProject(item.index, index);
          item.index = index;
        }
      },
    });

    return (
      <div
        ref={(node) => ref(drop(node))}
        className="bg-gray-800 text-white font-bold rounded mt-2 w-full p-3"
      >
        {project.map((project) => (
          <div>{project.label}</div>
        )
      )}
      </div>
    );
  };

  useEffect(() => {
    const savedProjects =
      JSON.parse(localStorage.getItem("selectedProjects")) || [];
    setAddedItems(savedProjects);
  }, []);

  useEffect(() => {
    localStorage.setItem("selectedProjects", JSON.stringify(selected));
  }, [selected]);

  const moveProject = (fromIndex, toIndex) => {
    const updatedProjects = [...addedItems];
    const [movedProject] = updatedProjects.splice(fromIndex, 1);
    updatedProjects.splice(toIndex, 0, movedProject);
    setAddedItems(updatedProjects);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col bg-gray-100 h-full p-4" ref={dropdownRef}>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 w-full">
          <div className="w-full md:w-1/3 p-4 bg-white rounded-lg shadow-md">
            <div className="flex justify-between items-center border-b-2">
              <h1 className="text-xl font-semibold pb-2 text-gray-600">
                {totalDuration}
              </h1>
              <label
                className="text-blue-800  bg-blue-100 flex p-1 rounded-sm items-center gap-2 text-xs"
                onClick={toggleModal}
              >
                {label}
                <FaRegCalendar />
              </label>
            </div>
            {open && (
              <div
                id="dropdownAvatarName"
                className="z-10 divide-y divide-gray-100 rounded-lg shadow w-48 bg-[#283046] dark:divide-gray-600 absolute right-[65%] mt-1"
              >
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownAvatarNameButton"
                >
                  <li>
                    <button
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white flex items-center gap-2 text-sm"
                      onClick={handleLogs}
                    >
                      Today
                    </button>
                  </li>
                </ul>
                <div className="py-2 text-sm text-white">
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white flex items-center gap-2 text-sm"
                    onClick={handleWeekLogs}
                  >
                    This Week
                  </button>
                </div>
                <div className="py-2 text-sm text-white">
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white flex items-center gap-2 text-sm"
                    onClick={handleMonthLogs}
                  >
                    This Month
                  </button>
                </div>
              </div>
            )}
            {logs.length > 0 ? (
              logs.map((log, index) => (
                <div key={index} className="mt-2">
                  <div className="text-gray-600 flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="bg-gray-200 rounded-full mr-2 p-2 text-md">
                        <FiWatch />
                      </div>
                      <p>{log.title}</p>
                    </div>
                    <p className="text-sm text-gray-500 font-semibold">
                      {durationFormat(log.duration)}
                    </p>
                  </div>
                  <div className="text-sm ml-10 text-red-500">
                    {log.projects}
                  </div>
                </div>
              ))
            ) : (
              <p className="mt-2 text-red-600">No logs for today.</p>
            )}
          </div>

          <div className="w-full md:w-1/3 p-4 bg-white rounded-lg shadow-md">
            <div className="flex justify-between items-center border-b-2">
              <h1 className="text-xl font-semibold pb-2 text-gray-600">
                {totalDuration}
              </h1>
            </div>
            {groupedLogs.length > 0 ? (
              groupedLogs.map((group, index) => {
                const totalProjectHours = Math.floor(
                  group.totalDuration / (1000 * 60 * 60)
                )
                  .toString()
                  .padStart(1, "0");
                const totalProjectMinutes = Math.floor(
                  (group.totalDuration % (1000 * 60 * 60)) / (1000 * 60)
                )
                  .toString()
                  .padStart(2, "0");
                const totalProjectDuration = `${totalProjectHours}hr ${totalProjectMinutes}m`;

                return (
                  <div key={index} className="mt-2">
                    <div className="text-gray-600 flex justify-between items-center">
                      <div className="text-md text-red-500">
                        {group.project}
                      </div>
                      <div className="text-md ml-10 text-gray-500">
                        {totalProjectDuration}
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 mt-1 rounded-full">
                      <div
                        className="bg-red-400 text-xs leading-none py-1 rounded-full text-center text-white"
                        style={{ width: "100%" }}
                      ></div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="mt-2 text-red-600">No logs for today.</p>
            )}
          </div>

          <div className="w-full md:w-1/3 p-4 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl text-gray-600 font-semibold border-b-2 pb-2">
              Activity Logs
            </h1>
            <div className="flex justify-center items-center mt-4">
              <img src={noData} alt="image-no-data" style={{ width: "70%" }} />
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 p-4 bg-white rounded-lg shadow-md mt-4">
          <h1 className="text-2xl text-gray-600 font-semibold border-b-2 pb-2">
            Projects WatchList
          </h1>
          <div className="flex flex-col items-center">
            <button
              className="flex items-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4"
              onClick={toggleAddProjectModal}
            >
              <GoPlus className="mr-2" />
              Add Project
            </button>

            <p className="mt-2 text-gray-600 text-center">
              Customize your watchlist by adding projects based on your
              preference.
            </p>
          </div>
          {selected.length > 0 && (
            <div className="w-full">
              {addedItems.length > 0 && (
                <div className="w-full">
                  {addedItems.map((project, index) => (
                    <DraggableProject
                      key={project.value}
                      project={project}
                      index={index}
                      moveProject={moveProject}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
          {addProjectModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-gray-800 bg-opacity-50">
              <div className="relative w-full max-w-lg p-6 bg-white rounded-md shadow-lg">
                <button
                  onClick={onRequestClose}
                  className="absolute top-0 right-0 mt-4 mr-4 text-gray-600 hover:text-gray-900"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </button>
                <h5 className="mb-4 text-xl font-semibold text-blue-500">
                  Add projects to your watchlist
                </h5>

                <div className="space-y-4">
                  <Select
                    isMulti
                    className="w-full"
                    options={projects.filter(
                      (project) => project.value !== null
                    )}
                    value={selected}
                    onChange={handleProjectChange}
                  />
                  <div className="flex m-auto justify-center">
                    <button
                      type="submit"
                      className="w-20 px-4 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:bg-blue-300 mr-2"
                      onClick={handleAddProject}
                    >
                      Add
                    </button>
                    <button
                      type="button"
                      className="w-20 px-4 py-2 font-semibold bg-white border text-blue-500 border-blue-500 rounded-md hover:bg-blue-900 focus:outline-none focus:bg-blue-700"
                      onClick={onRequestClose}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </DndProvider>
  );
};

export default Dashboard;
