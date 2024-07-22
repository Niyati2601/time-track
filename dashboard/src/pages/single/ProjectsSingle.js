import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Chart from "../../components/chart/Chart";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import List from "../../components/table/Table";
import "./Single.scss";
import apiUrl from "../../api/ApiUrl";
import { IoArrowBack } from "react-icons/io5";
import projectDefaultImage from "../../assests/defaultProjectImage.jpg";
import ProjectAssigneeTable from "../../components/table/ProjectAssigneeTable";
import moment from "moment";
import EditModal from "./EditProjectModal";

const ProjectsSingle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEditModal = () => {
    setIsEditModalOpen(!isEditModalOpen);
  };

  const handleSaveProject = async (updatedProject) => {
    try {
      const response = await fetch(`${apiUrl.updateProject.url}/${id}`, {
        method: apiUrl.updateProject.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(updatedProject),
      });

      if (!response.ok) {
        console.error("Failed to update project", response.statusText);
        return;
      }

      const data = await response.json();
      if (!data.success) {
        console.error("Failed to update project", data.message);
        return;
      }

      setProject(data.data);
    } catch (error) {
      console.error("An error occurred while updating project:", error);
    }
  };

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        if (!id) {
          console.error("Project ID is not defined");
          return;
        }

        const response = await fetch(`${apiUrl.getProjectById.url}/${id}`, {
          method: apiUrl.getProjectById.method,
          credentials: "include",
          headers: {
            "content-type": "application/json",
          },
        });

        if (!response.ok) {
          console.error("Failed to fetch project details", response.statusText);
          return;
        }

        const data = await response.json();
        if (!data.success) {
          console.error("Failed to fetch project details", data.message);
          return;
        }

        setProject(data.data);
      } catch (error) {
        console.error(
          "An error occurred while fetching project details:",
          error
        );
      }
    };

    fetchProjectDetails();
  }, [id]);

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <button className="back" onClick={() => navigate("/projects")}>
          <IoArrowBack className="icon" />
          Back
        </button>
        <div className="top">
          <div className="left">
            <div className="editButton" onClick={handleEditModal}>
              Edit
            </div>
            <h1 className="title">Project Details</h1>
            <div className="item">
              <img
                src={project?.logo ? project?.logo : projectDefaultImage}
                alt=""
                className="itemImg"
                style={{ border: "1px solid #7451f8",}}
              />
              <div className="details">
                <h1 className="itemTitle">{project?.name}</h1>
                <div className="detailItem">
                  <span className="itemKey">Id:</span>
                  <span className="itemValue">{project?._id}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Type:</span>
                  <span className="itemValue">{project?.type}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Description:</span>
                  <span className="itemValue">{project?.description}</span>
                </div>
                {project?.type === "personal" && (
                  <>
                    <div className="detailItem">
                      <span className="itemKey">Code:</span>
                      <span className="itemValue">{project?.projectCode}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Status:</span>
                      <span className="itemValue">
                        {project?.projectStatus}
                      </span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Scope:</span>
                      <span className="itemValue">{project?.projectScope}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Estimated Start Date:</span>
                      <span className="itemValue">
                        {moment(project?.estimatedStartDate).format(
                          "MMM DD, YYYY"
                        )}
                      </span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Estimated End Date:</span>
                      <span className="itemValue">
                        {moment(project?.estimatedEndDate).format(
                          "MMM DD, YYYY"
                        )}
                      </span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Actual Start Date:</span>
                      <span className="itemValue">
                        {moment(project?.actualStartDate).format(
                          "MMM DD, YYYY"
                        )}
                      </span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Actual End Date:</span>
                      <span className="itemValue">
                        {moment(project?.actualEndDate).format("MMM DD, YYYY")}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
            {isEditModalOpen && (
              <EditModal
                project={project}
                onClose={handleEditModal}
                onSave={handleSaveProject}
              />
            )}
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">Project Assignee</h1>
          <ProjectAssigneeTable />
        </div>
      </div>
    </div>
  );
};

export default ProjectsSingle;
