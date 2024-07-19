import React, { useState, useEffect } from "react";
import apiUrl from "../../api/Api";
import moment from "moment";
import { CiCalendar } from "react-icons/ci";
import { CgCircleci } from "react-icons/cg";

const Project = () => {
  const [projects, setProjects] = useState([]);

  const projectList = async () => {
    try {
      const res = await fetch(apiUrl.getProjectsByUserId.url, {
        method: apiUrl.getProjectsByUserId.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.success) {
        const filteredProjects = data.data.filter(
          (project) => project.type === "personal"
        );
        setProjects(filteredProjects);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    projectList();
  }, []);

  const formatDates = (date) => {
    return moment(date).format("ll");
  };

  return (
    <div className="flex flex-row">
      {projects &&
        projects.map((project) => (
          <div
            key={project.id}
            className="max-w-sm bg-white border border-gray-200 rounded-lg shadow p-4 m-4 cursor-pointer"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-blue-500 font-bold ">{project.name}</h2>
              <span className="text-blue-500">{project.costType}</span>
            </div>
            <div className="mb-4">
              <h3 className="font-bold">Project Scope</h3>
              <div className="flex flex-wrap">
                {project.projectScope &&
                  project.projectScope.map((scopeItem, index) => (
                    <span
                      key={index}
                      className="bg-red-200 text-orange-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded"
                    >
                      {scopeItem}
                    </span>
                  ))}
              </div>
            </div>
            <div className="mb-4">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <strong>Expected Start Date:</strong>{" "}
                  <span className="flex">
                    <CiCalendar className="m-1" />
                    {formatDates(project.estimatedStartDate)}
                  </span>
                </div>
                <div>
                  <strong>Expected End Date:</strong>{" "}
                  <span className="flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16px"
                      height="16px"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="mr-50 feather feather-target m-1"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <circle cx="12" cy="12" r="6"></circle>
                      <circle cx="12" cy="12" r="2"></circle>
                    </svg>
                    {formatDates(project.estimatedEndDate)}
                  </span>
                </div>
                <div>
                  <strong>Actual Start Date:</strong>
                  <br></br>
                  <span className="flex">
                    <CiCalendar className="m-1" />
                    {formatDates(project.actualStartDate)}
                  </span>
                </div>
                <div>
                  <strong>Actual End Date:</strong>
                  <br></br>
                  <span className="flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16px"
                      height="16px"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="mr-50 feather feather-target m-1"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <circle cx="12" cy="12" r="6"></circle>
                      <circle cx="12" cy="12" r="2"></circle>
                    </svg>
                    {formatDates(project.actualEndDate)}
                  </span>
                </div>
              </div>
            </div>
            {/* <div className="mb-4">
            <h3 className="font-bold">Members</h3>
            <div className="flex">
              {project.assignees && project.assignees.map((assignees, index) => (
                <span
                  key={index}
                  className="bg-gray-200 text-gray-700 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full"
                >
                  {assignees.initials}
                  
                </span>
              ))}
              <span className="text-gray-700 text-xs font-semibold">
                {project.assignees.length > 7 && `+${project.assignees.length - 7}`}
              </span>
            </div>
          </div> */}
            <div className="mb-4">
              <h3 className="font-bold">Project Status</h3>
              <span
                className={`px-2 py-0.5 rounded ${
                  project.projectStatus === "in_progress"
                    ? "bg-green-500 text-white"
                    : project.projectStatus === "in_planning"
                    ? "bg-yellow-500 text-white"
                    : project.projectStatus === "on_hold"
                    ? "bg-gray-500 text-white"
                    : project.projectStatus === "completed"
                    ? "bg-blue-500 text-white"
                    : project.projectStatus === "in_support"
                    ? "bg-purple-400 text-white"
                    : "bg-red-500 text-white"
                }`}
              >
                {project.projectStatus}
              </span>
            </div>

            {/* <div className="mb-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <strong>Time Spent:</strong> {project.timeSpent}
              </div>
              <div>
                <strong>Time Billable:</strong> {project.timeBillable}
              </div>
              <div>
                <strong>Max Time Planned:</strong> {project.maxTimePlanned}
              </div>
            </div>
          </div> */}
          </div>
        ))}
    </div>
  );
};

export default Project;
