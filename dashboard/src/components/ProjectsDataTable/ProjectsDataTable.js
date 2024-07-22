import React, { useEffect, useState } from "react";
import "./ProjectsDataTable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { projectColumns } from "../../DataSource";
import { useNavigate } from "react-router-dom";
import apiUrl from "../../api/ApiUrl";
import { VscEye } from "react-icons/vsc";
import { MdDeleteOutline } from "react-icons/md";
import Select from "react-select";
import Logo from "../../assests/defaultImage.jpg";
import imageToBase64 from "../../helpers/imageToBase64";

const projectScopeOptions = [
  { value: "Web Application", label: "Web Application" },
  { value: "Admin Panel", label: "Admin Panel" },
  { value: "Mobile App Android", label: "Mobile App Android" },
  { value: "Mobile App Ios", label: "Mobile App Ios" },
  { value: "Mobile App Hybrid", label: "Mobile App Hybrid" },
];

export default function ProjectsDataTable() {
  const [projects, setProjects] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteProjectId, setDeleteProjectId] = useState("");
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);
  const [newProject, setNewProject] = useState({
    logo: "",
    name: "",
    type: "general",
    assignees: [],
    projectScope: [],
  });
  const [isAssigneeDropdownOpen, setIsAssigneeDropdownOpen] = useState(false);
  const [file, setFile] = useState("");

  

  const navigate = useNavigate();

  const fetchProjects = async () => {
    const res = await fetch(apiUrl.getProjects.url, {
      method: apiUrl.getProjects.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });

    const data = await res.json();
    if (data.success) {
      setProjects(data.data);
    }
  };

  const fetchUsers = async () => {
    const res = await fetch(apiUrl.getAllUsers.url, {
      method: apiUrl.getAllUsers.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });

    const data = await res.json();
    if (data.success) {
      setAllUsers(data.data);
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchUsers();
  }, []);

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${apiUrl.deleteProject.url}/${id}`, {
        method: apiUrl.deleteProject.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
      });
      const data = await response.json();
      if (data.success) {
        fetchProjects();
        setIsDeleteModalOpen(false);
      }
    } catch (error) {
      console.error("Failed to delete project:", error);
    }
  };

  const handleAddProject = () => {
    setIsAddProjectModalOpen(true);
  };

  const closeAddProjectModal = () => {
    setIsAddProjectModalOpen(false);
    setNewProject((prev) => ({
      ...prev,
      logo: "",
    }));
  };

  const handleProjectInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAssigneeChange = (selectedOptions) => {
    const assignees = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];
    setNewProject((prev) => ({
      ...prev,
      assignees: assignees,
    }));
  };

  const handleScopeChange = (selectedOptions) => {
    const scopes = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];
    setNewProject((prev) => ({
      ...prev,
      projectScope: scopes,
    }));
  };

  const handleAddProjectSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(apiUrl.addProject.url, {
        method: apiUrl.addProject.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(newProject),
      });
      const data = await response.json();
      if (data.success) {
        fetchProjects();
        setIsAddProjectModalOpen(false);
      }
    } catch (error) {
      console.error("Failed to add project:", error);
    }
  };

  const handleProfilePicture = async (e) => {
    const files = e.target.files[0];
    setFile(e.target.files[0]);
    const picture = await imageToBase64(files);
    setNewProject((prev) => {
      return {
        ...prev,
        logo: picture,
      };
    });
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <span
              className="viewButton"
              onClick={() => navigate(`/projects/${params.row._id}`)}
            >
              <VscEye size={24} />
            </span>
            <span
              className="deleteButton"
              onClick={() => {
                setIsDeleteModalOpen(true);
                setDeleteProjectId(params.row._id);
              }}
            >
              <MdDeleteOutline size={24} />
            </span>
          </div>
        );
      },
    },
  ];

  const assigneeOptions = allUsers.map((user) => ({
    value: user._id,
    label: user.username,
  }));

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Projects
        <button onClick={handleAddProject} className="link">
          Add Project
        </button>
      </div>
      <div className="datatableContainer">
        <DataGrid
          className="datagrid"
          rows={projects}
          columns={projectColumns.concat(actionColumn)}
          getRowId={(row) => row._id}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSize={10}
          pageSizeOptions={[5, 10, 15, 20, 25]}
          rowsPerPageOptions={[5, 10]}
          checkboxSelection
        />
        {isDeleteModalOpen && (
          <div className="delete-modal-overlay">
            <div className="delete-modal-content">
              <h2 className="modal-title">
                Are you sure you want to delete this project?
              </h2>
              <div className="modal-buttons">
                <button
                  onClick={() => handleDelete(deleteProjectId)}
                  className="delete-button"
                >
                  Delete
                </button>
                <button onClick={closeDeleteModal} className="cancel-button">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
        {isAddProjectModalOpen && (
          <div className="add-project-modal-overlay">
            <div className="add-project-modal-content">
              <h2 className="modal-title">Add New Project</h2>
              <form onSubmit={handleAddProjectSubmit}>
                <div>
                  <label htmlFor="file">
                    <input
                      type="file"
                      id="file"
                      style={{ display: "none", cursor: "pointer" }}
                      onChange={handleProfilePicture}
                    />
                    <img
                      src={file ? URL.createObjectURL(file) : Logo}
                      alt="logo"
                      className="modal-logo"
                      style={{
                        cursor: "pointer",
                        width: "70px",
                        height: "70px",
                        borderRadius: "50%",
                        display:'flex',
                        justifyContent:'center',
                        alignItems:'center',
                        margin: 'auto'
                      }}
                    />
                    <h3 style={{
                      display:'flex',
                      justifyContent:'center',
                      alignItems:'center',
                      margin: 'auto'
                    }}>Upload Project Logo</h3>
                  </label>
                </div>
                <div className="form-group">
                  <label htmlFor="name">Project Name:</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={newProject.name}
                    onChange={handleProjectInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="type">Type:</label>
                  <select
                    id="type"
                    name="type"
                    value={newProject.type}
                    onChange={handleProjectInputChange}
                    required
                  >
                    <option value="general">General</option>
                    <option value="personal">Personal</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description:</label>
                  <textarea
                    id="description"
                    name="description"
                    value={newProject.description}
                    onChange={handleProjectInputChange}
                    rows="5"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="projectCode">Project Code:</label>
                  <input
                    type="text"
                    id="projectCode"
                    name="projectCode"
                    value={newProject.projectCode}
                    onChange={handleProjectInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="projectScope">Project Scope:</label>
                  <Select
                    isMulti
                    options={projectScopeOptions}
                    value={projectScopeOptions.filter((option) =>
                      newProject.projectScope.includes(option.value)
                    )}
                    onChange={handleScopeChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="estimatedStartDate">
                    Estimated Start Date:
                  </label>
                  <input
                    type="date"
                    id="estimatedStartDate"
                    name="estimatedStartDate"
                    value={newProject.estimatedStartDate}
                    onChange={handleProjectInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="estimatedEndDate">Estimated End Date:</label>
                  <input
                    type="date"
                    id="estimatedEndDate"
                    name="estimatedEndDate"
                    value={newProject.estimatedEndDate}
                    onChange={handleProjectInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="actualStartDate">Actual Start Date:</label>
                  <input
                    type="date"
                    id="actualStartDate"
                    name="actualStartDate"
                    value={newProject.actualStartDate}
                    onChange={handleProjectInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="actualEndDate">Actual End Date:</label>
                  <input
                    type="date"
                    id="actualEndDate"
                    name="actualEndDate"
                    value={newProject.actualEndDate}
                    onChange={handleProjectInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="projectStatus">Project Status:</label>
                  <select
                    id="projectStatus"
                    name="projectStatus"
                    value={newProject.projectStatus}
                    onChange={handleProjectInputChange}
                    required
                  >
                    <option value="in_progress">In Progress</option>
                    <option value="in_planning">In Planning</option>
                    <option value="in_support">Support</option>
                    <option value="on_hold">On Hold</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                {newProject.type === "personal" && (
                  <div className="form-group">
                    <label htmlFor="assignees">Assignees:</label>
                    <Select
                      isMulti
                      options={assigneeOptions}
                      value={assigneeOptions.filter((option) =>
                        newProject.assignees.includes(option.value)
                      )}
                      onChange={handleAssigneeChange}
                    />
                  </div>
                )}
                <div className="modal-buttons">
                  <button type="submit" className="submit-button">
                    Add Project
                  </button>
                  <button
                    type="button"
                    onClick={closeAddProjectModal}
                    className="cancel-button"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
