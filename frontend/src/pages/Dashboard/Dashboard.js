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
import { IoMdClose } from "react-icons/io";
import { GrFormNextLink } from "react-icons/gr";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';


const Dashboard = () => {
  const [logs, setLogs] = useState([]);
  const [open, setOpen] = useState(false);
  const [label, setlabel] = useState("Today");
  const [addProjectModal, setAddProjectModal] = useState(false);
  const [projects, setProjects] = useState([]);
  const [selected, setSelected] = useState([]);
  const [addedItems, setAddedItems] = useState([]);
  const navigate = useNavigate();

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
            logo: project.logo,
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
  }, [addProjectModal]);

  const handleProjectChange = (selectedOption) => {
    setSelected(selectedOption);
  };

  const handleAddProject = async () => {
    if (selected.length > 0) {
      setAddedItems([...addedItems, ...selected]);
      setSelected([]);
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
        className="bg-blue-100 text-blue-600 font-bold rounded mt-2 w-full p-3 cursor-move"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full flex items-center justify-center mr-2">
              <img
                src={project.logo}
                alt="project logo"
                className="w-10 h-10 rounded-full"
              />
            </div>
            {project.label}
          </div>
          <div className="float-right flex gap-2">
            <button onClick={() => handleRemoveProject(index)}>
              <AiOutlineMinusCircle size={20} />
            </button>
            <button onClick={() => navigate(`/project-details/${project.value}`)}>
              <GrFormNextLink size={25} />
            </button>
          </div>
        </div>
      </div>
    );
  };
  const handleRemoveProject = (index) => {
    const updatedItems = addedItems.filter((_, i) => i !== index);
    setAddedItems(updatedItems);
  };

  useEffect(() => {
    const savedProjects =
      JSON.parse(localStorage.getItem("selectedProjects")) || [];
    setAddedItems(savedProjects);
  }, []);

  useEffect(() => {
    localStorage.setItem("selectedProjects", JSON.stringify(addedItems));
  }, [addedItems]);

  const moveProject = (fromIndex, toIndex) => {
    const updatedProjects = [...addedItems];
    const [movedProject] = updatedProjects.splice(fromIndex, 1);
    updatedProjects.splice(toIndex, 0, movedProject);
    setAddedItems(updatedProjects);
  };
  const filteredProjects = projects.filter(
    (project) => !addedItems.some((addedItem) => addedItem.value === project.value)
  );


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

                // Calculate the percentage width based on total duration of all projects
                const totalLogsDuration = logs.reduce((total, log) => {
                  if (log.duration !== "-") {
                    const [hours, minutes] = log.duration.split(":").map(Number);
                    return total + hours * 60 * 60 * 1000 + minutes * 60 * 1000;
                  }
                  return total;
                }, 0);
                const projectPercentage =
                  (group.totalDuration / totalLogsDuration) * 100;

                return (
                  <div key={index} className="mt-2">
                    <div className="text-gray-600 flex justify-between items-center">
                      <div className="text-md text-red-500">{group.project}</div>
                      <div className="text-md ml-10 text-gray-500">
                        {totalProjectDuration}
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 mt-1 rounded-full">
                      <div
                        className="bg-red-400 text-xs leading-none py-1 rounded-full text-center text-white"
                        style={{ width: `${projectPercentage}%` }}
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
        <div className="w-full md:w-2/3 p-4 bg-white rounded-lg shadow-md mt-3">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-600 pb-2">
              Watchlist
            </h2>
            <button
              className="bg-blue-600 text-white rounded px-2 py-1 "
              onClick={toggleAddProjectModal}
            >
              <span className="flex items-center gap-1">
                <GoPlus />
                Add Projects
              </span>
            </button>
          </div>
          {addedItems.length > 0 ? (
            addedItems.map((project, index) => (
              <DraggableProject
                key={project.value}
                project={project}
                index={index}
                moveProject={moveProject}
              />
            ))
          ) : (
            <div className="text-center py-4">
              <img
                src={noData}
                alt="No data"
                className="w-32 mx-auto mb-2"
              />
              <p className="text-gray-500">No projects in watchlist.</p>
            </div>
          )}
        </div>
        {addProjectModal && (
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50 mt-4">
            <div className="bg-white rounded-lg shadow-lg p-4 w-96">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-600">
                  Add Project
                </h2>
                <button
                  className="text-gray-600 hover:text-gray-800 rotate-hover"
                  onClick={onRequestClose}
                >
                  <IoMdClose className='text-lg ' />
                </button>
              </div>
              <Select
                options={filteredProjects}
                isMulti
                value={selected}
                onChange={handleProjectChange}
                placeholder="Select projects"
              />
              <button
                className="bg-blue-600 text-white rounded py-2 mt-4 w-full"
                onClick={handleAddProject}
              >
                Add to Watchlist
              </button>
            </div>
          </div>
        )}
      </div>
    </DndProvider>
  );
};

export default Dashboard;
