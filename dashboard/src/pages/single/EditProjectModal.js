import React, { useState, useEffect } from "react";
import "./EditModal.scss";
import Select from "react-select";
import moment from "moment";
import imageToBase64 from "../../helpers/imageToBase64";
import defaultImage from "../../assests/defaultProjectImage.jpg";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import apiUrl from "../../api/ApiUrl";
import toast from "react-hot-toast";

const EditModal = ({ project, onClose, onSave }) => {
  const projectScopeOptions = [
    { value: "Web Application", label: "Web Application" },
    { value: "Admin Panel", label: "Admin Panel" },
    { value: "Mobile App Android", label: "Mobile App Android" },
    { value: "Mobile App Ios", label: "Mobile App Ios" },
    { value: "Mobile App Hybrid", label: "Mobile App Hybrid" },
  ];

  const [formData, setFormData] = useState({ ...project });
  const [file, setFile] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [assigneeOptions, setAssigneeOptions] = useState([]);
  const [selectedAssignees, setSelectedAssignees] = useState([]);

  useEffect(() => {
    setFormData({ ...project });
    setSelectedAssignees(
      project.assignees.map((assignee) => ({
        value: assignee._id,
        label: assignee.username,
      }))
    );
  }, [project]);

  useEffect(() => {
    fetchAssignees();
  }, []);

  const fetchAssignees = async () => {
    try {
      const res = await fetch(apiUrl.getAllUsers.url, {
        method: apiUrl.getAllUsers.method,
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const data = await res.json();
  
      if (data.success) {
        // Filter users with role 'user'
        const usersWithRoleUser = data.data.filter((user) => user.role === "user");
        console.log('usersWithRoleUser: ', usersWithRoleUser);
  
        const userOptions = usersWithRoleUser.map((user) => ({
          value: user._id,
          label: user.username,
        }));
        setAllUsers(userOptions);
  
        const availableAssignees = userOptions.filter(
          (user) => !project.assignees.some((assignee) => assignee._id === user.value)
        );
  
        setAssigneeOptions(availableAssignees);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    const updatedFormData = {
      ...formData,
      assignees: selectedAssignees.map((assignee) => ({
        _id: assignee.value,
        username: assignee.label,
      })),
    };
    onSave(updatedFormData);
    onClose();
  };

  const handleScopeChange = (selectedOptions) => {
    const scopes = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];
    setFormData((prev) => ({
      ...prev,
      projectScope: scopes,
    }));
  };

  const handleAssigneesChange = (selectedOptions) => {
    setSelectedAssignees(selectedOptions);
    const remainingOptions = allUsers.filter(
      (user) => !selectedOptions.some((assignee) => assignee.value === user.value)
    );
    setAssigneeOptions(remainingOptions);
    
  };

  const handleProfilePicture = async (e) => {
    const files = e.target.files[0];
    setFile(e.target.files[0]);
    const picture = await imageToBase64(files);
    setFormData((prev) => {
      return {
        ...prev,
        logo: picture,
      };
    });
  };

  return (
    <div className="editModal">
      <div className="modalContent">
        <h2>Edit Project</h2>
        <div>
          <label htmlFor="file">
            <input
              type="file"
              id="file"
              style={{ display: "none", cursor: "pointer" }}
              onChange={handleProfilePicture}
            />
            <img
              src={file ? URL.createObjectURL(file) : formData.logo || defaultImage}
              alt="logo"
              className="modal-logo"
              style={{
                cursor: "pointer",
                width: "70px",
                height: "70px",
                borderRadius: "50%",
                border: "1px solid #7451f8",
              }}
            />
            {formData.logo && (
              <DeleteForeverIcon
                style={{ cursor: "pointer", marginLeft: "10px" }}
                onClick={() => setFormData({ ...formData, logo: "" })}
              />
            )}
            <h3>Change Logo</h3>
          </label>
        </div>
        <div className="formGroup">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        {/* <div className="formGroup">
          <label htmlFor="select">Type:</label>
          <select
            id="select"
            name="select"
            value={formData.type}
            onChange={handleChange}
          >
            <option value="general">General</option>
            <option value="personal">Personal</option>
          </select>
        </div> */}
        <div className="formGroup">
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>
        {formData.type === "personal" && (
          <>
            <div className="formGroup">
              <label>Code:</label>
              <input
                type="text"
                name="projectCode"
                value={formData.projectCode}
                onChange={handleChange}
                required
              />
            </div>
            <div className="formGroup">
              <label htmlFor="projectStatus">Status:</label>
              <select
                id="projectStatus"
                name="projectStatus"
                value={formData.projectStatus}
                onChange={handleChange}
              >
                <option value="completed">Completed</option>
                <option value="in_progress">In Progress</option>
                <option value="on_hold">On Hold</option>
                <option value="in_planning">In Planning</option>
                <option value="in_support">In Support</option>
              </select>
            </div>
            <div className="formGroup">
              <label htmlFor="projectScope">Project Scope:</label>
              <Select
                isMulti
                options={projectScopeOptions}
                value={projectScopeOptions.filter((option) =>
                  formData.projectScope.includes(option.value)
                )}
                onChange={handleScopeChange}
              />
            </div>
            <div className="formGroup">
              <label htmlFor="assignees">Assignees:</label>
              <Select
                isMulti
                options={assigneeOptions}
                value={selectedAssignees}
                onChange={handleAssigneesChange}
              />
            </div>
            <div className="formGroup">
              <label htmlFor="estimatedStartDate">Estimated Start Date:</label>
              <input
                type="date"
                id="estimatedStartDate"
                name="estimatedStartDate"
                value={moment(formData.estimatedStartDate).format("YYYY-MM-DD")}
                onChange={handleChange}
                required
              />
            </div>
            <div className="formGroup">
              <label htmlFor="estimatedEndDate">Estimated End Date:</label>
              <input
                type="date"
                id="estimatedEndDate"
                name="estimatedEndDate"
                value={moment(formData.estimatedEndDate).format("YYYY-MM-DD")}
                onChange={handleChange}
                required
              />
            </div>
            <div className="formGroup">
              <label htmlFor="actualStartDate">Actual Start Date:</label>
              <input
                type="date"
                id="actualStartDate"
                name="actualStartDate"
                value={moment(formData.actualStartDate).format("YYYY-MM-DD")}
                onChange={handleChange}
                required
              />
            </div>
            <div className="formGroup">
              <label htmlFor="actualEndDate">Actual End Date:</label>
              <input
                type="date"
                id="actualEndDate"
                name="actualEndDate"
                value={moment(formData.actualEndDate).format("YYYY-MM-DD")}
                onChange={handleChange}
              />
            </div>
          </>
        )}
        <div
          className="buttonGroup"
          style={{ marginBottom: "10px", cursor: "pointer" }}
        >
          <button onClick={handleSave}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
