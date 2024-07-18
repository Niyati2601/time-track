import React, { useEffect, useState } from "react";
import "./ProjectsDataTable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../DataSource";
import { useNavigate } from "react-router-dom";
import apiUrl from "../../api/ApiUrl";
import { VscEye } from "react-icons/vsc";
import { MdDeleteOutline } from "react-icons/md";

export default function ProjectsDataTable() {
    const [users, setUsers] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deleteUserId, setDeleteUserId] = useState("");
    const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);
    const [newProject, setNewProject] = useState({ name: "", type: "common", assignees: [] });
    const [isAssigneeDropdownOpen, setIsAssigneeDropdownOpen] = useState(false);

    const navigate = useNavigate();

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
            setUsers(data.data);
            setAllUsers(data.data);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`${apiUrl.deleteUserById.url}/${id}`, {
                method: apiUrl.deleteUserById.method,
                credentials: "include",
                headers: {
                    "content-type": "application/json",
                },
            });
            const data = await response.json();
            if (data.success) {
                fetchUsers();
                setIsDeleteModalOpen(false);
            }
        } catch (error) {
            console.error("Failed to delete user:", error);
        }
    };

    const handleAddProject = () => {
        setIsAddProjectModalOpen(true);
    };

    const closeAddProjectModal = () => {
        setIsAddProjectModalOpen(false);
    };

    const handleProjectInputChange = (e) => {
        const { name, value } = e.target;
        setNewProject((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleAssigneeChange = (e) => {
        const { value, checked } = e.target;
        setNewProject((prev) => {
            const newAssignees = checked
                ? [...prev.assignees, value]
                : prev.assignees.filter((assignee) => assignee !== value);
            return {
                ...prev,
                assignees: newAssignees,
            };
        });
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
                fetchUsers();
                setIsAddProjectModalOpen(false);
            }
        } catch (error) {
            console.error("Failed to add project:", error);
        }
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
                            onClick={() => navigate(`/users/${params.row._id}`)}
                        >
                            <VscEye size={24} />
                        </span>
                        <span
                            className="deleteButton"
                            onClick={() => {
                                setIsDeleteModalOpen(true);
                                setDeleteUserId(params.row._id);
                            }}
                        >
                            <MdDeleteOutline size={24} />
                        </span>
                    </div>
                );
            },
        },
    ];

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
                    rows={users}
                    columns={userColumns.concat(actionColumn)}
                    getRowId={(row) => row._id}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSize={5}
                    pageSizeOptions={[5, 10]}
                    rowsPerPageOptions={[5, 10]}
                    checkboxSelection
                />
                {isDeleteModalOpen && (
                    <div className="delete-modal-overlay">
                        <div className="delete-modal-content">
                            <h2 className="modal-title">
                                Are you sure you want to delete this user?
                            </h2>
                            <div className="modal-buttons">
                                <button
                                    onClick={() => handleDelete(deleteUserId)}
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
                                {newProject.type === "personal" && (
                                    <div className="form-group">
                                        <label htmlFor="assignees">Assignees:</label>
                                        <div className="dropdown">
                                            <select
                                                type="assignees"
                                                onClick={() => setIsAssigneeDropdownOpen(!isAssigneeDropdownOpen)}
                                                className="dropdown-toggle"
                                                value={newProject.assignees}
                                                id="assignees"
                                                name="assignees"
                                            >
                                            </select>
                                                
                                            {isAssigneeDropdownOpen && (
                                                <div className="dropdown-list">
                                                    {allUsers.map((user) => (
                                                        <label key={user._id} className="dropdown-option">
                                                            <input
                                                                type="checkbox"
                                                                name="dropdown-group"
                                                                value={user._id}
                                                                checked={newProject.assignees.includes(user._id)}
                                                                onChange={handleAssigneeChange}
                                                            />
                                                           {user.username}
                                                        </label>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                                <div className="modal-buttons">
                                    <button type="submit" className="submit-button">
                                        Add Project
                                    </button>
                                    <button type="button" onClick={closeAddProjectModal} className="cancel-button">
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
