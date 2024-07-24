import React, { useState, useEffect } from "react";
import apiUrl from "../../api/Api";
import { useParams } from "react-router-dom";
import moment from "moment";
import { CiCalendar } from "react-icons/ci";

const ProjectDetails = () => {
  const [project, setProject] = useState(null);
  const { id } = useParams();

  const fetchProjectDetails = async () => {
    try {
      const res = await fetch(`${apiUrl.getProjectDetails.url}/${id}`, {
        method: apiUrl.getProjectDetails.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      if (data.success) {
        setProject(data.data);
      }
    } catch (error) {
      console.error(error || error.message);
    }
  };

  useEffect(() => {
    fetchProjectDetails();
  }, []);

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="bg-white p-4 rounded-md shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-semibold text-blue-600">
            Project Overview
          </h1>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <h2 className="text-gray-600 font-bold">Project Name</h2>
            <p className="text-gray-700">{project.name}</p>
          </div>
          <div>
            <h2 className="text-gray-600 font-bold">Project Description</h2>
            <p className="text-gray-700">{project.description}</p>
          </div>
          <div>
            <h2 className="text-gray-600 font-bold">Project Type</h2>
            <p className="text-gray-700">{project.type}</p>
          </div>
          <div className="col-span-3">
            <h2 className="text-gray-600 font-bold mb-1">Project Scope</h2>
            <div className="flex space-x-2">
              {project.projectScope.map((scopeItem, index) => {
                let bgColor;
                let textColor;
                switch (scopeItem) {
                  case "Mobile App-Hybrid":
                    bgColor = "bg-green-200";
                    textColor = "text-green-800";
                    break;
                  case "Admin Panel":
                    bgColor = "bg-blue-200";
                    textColor = "text-blue-800";
                    break;
                  case "Web Application":
                    bgColor = "bg-red-200";
                    textColor = "text-red-800";
                    break;
                  case "Mobile App iOS":
                    bgColor = "bg-orange-200";
                    textColor = "text-orange-800";
                    break;
                  case "Mobile App Android":
                    bgColor = "bg-yellow-200";
                    textColor = "text-yellow-800";
                    break;
                  default:
                    bgColor = "bg-gray-200";
                    textColor = "text-gray-800";
                }
                return (
                  <span
                    key={index}
                    className={`${bgColor} ${textColor} px-2 py-1 rounded-md`}
                  >
                    {scopeItem}
                  </span>
                );
              })}
            </div>
          </div>
          <div>
            <h2 className="text-gray-600 font-bold mb-1">Project Status</h2>
            <span className="bg-green-200 text-green-800 px-2 py-1 rounded-md">
              {project.projectStatus}
            </span>
          </div>
          <div>
            <h2 className="text-gray-600 font-bold">Time Spent</h2>
            <p className="text-gray-700">{project.timeSpent}</p>
          </div>
          <div>
            <h2 className="text-gray-600 font-bold">Max Time Planned</h2>
            <p className="text-gray-700">{project.maxTimePlanned}</p>
          </div>
          <div>
            <h2 className="text-gray-600 font-bold">Time Billable</h2>
            <p className="text-gray-700">{project.timeBillable}</p>
          </div>
          <div>
            <h2 className="text-gray-600 font-bold">Project Code</h2>
            <p className="text-gray-700">{project.projectCode}</p>
          </div>
        </div>
      </div>
      <div className="bg-white p-4 rounded-md shadow-md mt-3">
        <div className="mb-4">
          <h1 className="text-xl font-semibold text-blue-600 mb-2">
            Timeline Overview
          </h1>
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-gray-100 p-3 rounded-md">
              <h2 className="text-gray-600 font-semibold">
                Estimated Start Date
              </h2>
              <div className="text-gray-700 flex gap-1">
                <p className="text-xl">
                  {" "}
                  <CiCalendar />
                </p>
                <p className="font-bold">
                  {moment(project?.estimatedStartDate).format("MMM, DD, YYYY")}
                </p>
              </div>
            </div>
            <div className="bg-gray-100 p-3 rounded-md">
              <h2 className="text-gray-600 font-semibold">
                Estimated End Date
              </h2>
              <div className="text-gray-700 flex gap-1">
                <p className="text-xl">
                  {" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16px"
                    height="16px"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-50 feather feather-target m-1"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <circle cx="12" cy="12" r="6"></circle>
                    <circle cx="12" cy="12" r="2"></circle>
                  </svg>
                </p>
                <p className="font-bold">
                  {moment(project?.estimatedEndDate).format("MMM, DD, YYYY")}
                </p>
              </div>
            </div>
            <div className="bg-gray-100 p-3 rounded-md">
              <h2 className="text-gray-600 font-semibold">Actual Start Date</h2>
              <div className="text-gray-700 flex gap-1">
                <p className="text-xl">
                  {" "}
                  <CiCalendar />
                </p>
                <p className="font-bold">
                  {moment(project?.actualStartDate).format("MMM, DD, YYYY")}
                </p>
              </div>
            </div>
            <div className="bg-gray-100 p-3 rounded-md">
              <h2 className="text-gray-600 font-semibold">Actual End Date</h2>
              <div className="text-gray-700 flex gap-1">
                <p className="text-xl">
                  {" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16px"
                    height="16px"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-50 feather feather-target m-1"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <circle cx="12" cy="12" r="6"></circle>
                    <circle cx="12" cy="12" r="2"></circle>
                  </svg>
                </p>
                <p className="font-bold">
                  {moment(project?.actualEndDate).format("MMM, DD, YYYY")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="bg-white p-4 rounded-md shadow-md mt-3 w-2/3">
          <div className="mb-4">
            <h1 className="text-xl font-semibold text-blue-600 mb-2">
              QAssure Report
            </h1>
            <div className="grid grid-cols-6 gap-3">
              <div className="bg-purple-200 text-purple-800 p-4 rounded-md">
                <h2 className="font-semibold">Total Defects</h2>
                <p className="text-xl">{project?.qassure?.totalDefects || 0}</p>
              </div>
              <div className="bg-red-200 text-red-800 p-4 rounded-md">
                <h2 className="font-semibold">Open</h2>
                <p className="text-xl">{project?.qassure?.open || 0}</p>
              </div>
              <div className="bg-orange-200 text-orange-800 p-4 rounded-md">
                <h2 className="font-semibold">Reopen</h2>
                <p className="text-xl">{project?.qassure?.reopen || 0}</p>
              </div>
              <div className="bg-green-200 text-green-800 p-4 rounded-md">
                <h2 className="font-semibold">Resolved</h2>
                <p className="text-xl">{project?.qassure?.resolved || 0}</p>
              </div>
              <div className="bg-blue-200 text-blue-800 p-4 rounded-md">
                <h2 className="font-semibold">Not An Issue</h2>
                <p className="text-xl">{project?.qassure?.notAnIssue || 0}</p>
              </div>
              <div className="bg-gray-200 text-gray-800 p-4 rounded-md">
                <h2 className="font-semibold">Close</h2>
                <p className="text-xl">{project?.qassure?.close || 0}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-md shadow-md mt-3 w-1/3 ml-2">
          <div className="mb-4">
            <h1 className="text-xl font-semibold text-blue-600 mb-2">
              Notifications
            </h1>
            <div className="bg-gray-100 p-4 rounded-md">
              {project?.notifications?.map((notification, index) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-gray-700">{notification?.title}</p>
                      <p className="text-gray-500">{notification?.date}</p>
                    </div>
                  </div>
                  <p className="text-gray-700">{notification?.message}</p>
                </div>
              ))}
              <button className="text-blue-600 hover:underline">
                Read All
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectDetails;
