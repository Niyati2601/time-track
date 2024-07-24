import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
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
  console.log('project: ', project);
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

  const getScopeColor = (scope) => {
    switch (scope) {
      case 'Web Application':
        return '#DC3954';
      case 'Admin Panel':
        return '#154EEF';
      case 'Mobile App Hybrid':
        return 'green';
      case 'Mobile App Ios':
        return 'grey';
      case 'Mobile App Android':
        return '#fbbf24';
      default:
        return 'black';
    }
  };

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <button className="back" onClick={() => navigate(-1)}>
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
                style={{ border: "1px solid #7451f8", objectFit:"contain" }}
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
                      
                        {project?.projectScope.map((scope,index) => {
                          const color = getScopeColor(scope);
                          return (
                          <span key={index} className="itemValue" style={{
                            padding: '0.1rem 0.1rem',
                            borderRadius: '5px',
                            color:color,
                            textAlign: 'center',
                            fontSize: '0.675rem',
                            fontWeight: 'bold',
                            width: 'fit-content',
                            height: '30px',
                            lineHeight: '30px',
                            border: `1px solid ${color}` ,
                            margin: '0.1rem 0.1rem',
                            marginTop: '8px'
                          }}>{scope}</span>
                        )
                        })}
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
                        {project?.actualEndDate === null
                          ? "N/A"
                          : moment(project?.actualEndDate).format(
                              "MMM DD, YYYY"
                            )}
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
        {project?.type === "personal" && (
          <div className="bottom">
            <h1 className="title">Project Assignee</h1>
            <ProjectAssigneeTable />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsSingle;
