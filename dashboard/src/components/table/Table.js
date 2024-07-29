import "./Table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import apiUrl from "../../api/ApiUrl";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import moment from "moment";
import Edit from "@mui/icons-material/Edit";
import Select from "react-select";
import toast from "react-hot-toast";

const List = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isEditLogModalOpen, setIsEditLogModalOpen] = useState(false);
  const [currentLog, setCurrentLog] = useState(null);
  console.log('currentLog: ', currentLog);
  const [projectOptions, setProjectOptions] = useState([]);
  const [tags, setTags] = useState([]);
  const [editLogs,setEditLogs] = useState({
    _id: "",
    title: "",
    projects: "",
    tags: [],
    startTIme: new Date(),
    endTIme: new Date(),
  })
  console.log('editLogs: ', editLogs);
  

  const handleLogs = async () => {
    try {
      const response = await fetch(`${apiUrl.getLogs.url}/${id}`, {
        method: apiUrl.getLogs.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
      });
      const data = await response.json();
      setData(data?.data || []); // Ensure that data is an array
    } catch (error) {
      console.error("Failed to fetch logs:", error);
      setData([]); // Set data to an empty array on error
    }
  };


  useEffect(() => {
    handleLogs();
  }, [id]);

  const formatTime = (dateString) => {
    if (!dateString) {
      return "";
    } else {
      return moment(dateString).format("hh:mm a");
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const closeEditLogModal = () => {
    setIsEditLogModalOpen(false);
    setCurrentLog(null);
    setEditLogs({
      _id: '',
      title: '',
      projects:'',
      tags:[],
      startTIme: new Date(),
      endTIme: new Date(),
    })
  };

  const fetchProjects = async () => {
    try {
      const res = await fetch(apiUrl.getProjects.url, {
        method: apiUrl.getProjects.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
      });
  
      const data = await res.json();
      if (data.success) {
        setProjectOptions(
          data.data.map((project) => ({
            value: project._id,
            label: project.name,
          }))
        );
      } else {
        setProjectOptions([]);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  
  const fetchTags = async () => {
    try {
      const res = await fetch(apiUrl.getTags.url, {
        method: apiUrl.getTags.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
      });
      const data = await res.json();
      if (data.success) {
        setTags(
          data.data.map((tag) => ({
            value: tag._id,
            label: tag.name,
          }))
        );
        console.log("tags: ", tags);
      } else {
        setTags([]);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  

  const handleLogModal = (log) => {
  setCurrentLog(log);
  setIsEditLogModalOpen(true);
  fetchProjects();
  fetchTags();
};

  const handleFormSubmit = async(e) => {
    e.preventDefault();
    try {
      const res = await fetch(apiUrl.editLogs.url,{
        method: apiUrl.editLogs.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          ...editLogs,
          startTIme: editLogs.startTIme,
          endTIme: editLogs.endTIme
        })
      })
      const data = await res.json();
      if(data.success) {
        toast.success(data.message);
        closeEditLogModal();
        handleLogs();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleChangeLog = (e) => {
    const { name, value } = e.target;
    setEditLogs({
      ...editLogs,
      [name]: value
    })
  }

  const handleStartTime = (date) => {
    setEditLogs((prev) => ({
      ...prev,
      startTIme: date
    }));
  }

  const handleEndTime = (date) => {
    setEditLogs((prev) => ({
      ...prev,
      endTIme: date
    }));
  }

  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">ID</TableCell>
            <TableCell className="tableCell">Title</TableCell>
            <TableCell className="tableCell">Tags</TableCell>
            <TableCell className="tableCell">Projects</TableCell>
            <TableCell className="tableCell">Time</TableCell>
            <TableCell className="tableCell">Duration</TableCell>
            <TableCell className="tableCell">Created At</TableCell>
            <TableCell className="tableCell">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : data
          ).map((log) => (
            <TableRow key={log._id}>
              <TableCell className="tableCell-id">{log._id}</TableCell>
              <TableCell className="tableCell">{log.title}</TableCell>
              <TableCell className="tableCell">{log.tags.join(",")}</TableCell>
              <TableCell className="tableCell">{log.projects}</TableCell>
              <TableCell className="tableCell">
                {formatTime(log.startTIme)} - {formatTime(log.endTIme)}
              </TableCell>
              <TableCell className="tableCell">{log.duration}</TableCell>
              <TableCell className="tableCell">
                {moment(log.createdAt).format("DD/MM/YYYY")}
              </TableCell>
              <TableCell className="tableCell">
                <span className="viewButton">
                  <Edit onClick={() => handleLogModal(log)} />
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        className="pagination"
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {isEditLogModalOpen && currentLog && (
  <div className="edit-log-modal">
    <div className="edit-log-modal-overlay">
      <div className="edit-log-modal-content">
        <h2 className="modal-title">Edit User Log</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              className="form-control"
              defaultValue={currentLog.title}
              onChange={handleChangeLog}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="projects">Projects</label>
            {/* <Select
              name="projects"
              options={projectOptions}
              defaultValue={Array.isArray(currentLog.projects) ? 
                currentLog.projects.map(project => ({
                  value: project._id,
                  label: project.name
                })) : []}

            /> */}
            <select
              name="projects"
              className="form-control"
              defaultValue={currentLog.projects}
              onChange={handleChangeLog}
            >
              {projectOptions.map((project) => (
                <option key={project.value} value={project.value}>
                  {project.label}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="tags">Tags</label>
            <Select
              isMulti
              name="tags"
              options={tags}
              defaultValue={tags.filter(tag => currentLog.tags.includes(tag.label))}

            />
          </div>
          <div className="form-group">
            <label htmlFor="startTIme">Start Time</label>
            <input
              type="datetime-local"
              id="startTIme"
              name="startTIme"
              className="form-control"
              defaultValue={moment(currentLog.startTIme).format("YYYY-MM-DDTHH:mm")}
              onChange={handleStartTime}
            />
          </div>
          <div className="form-group">
            <label htmlFor="endTIme">End Time</label>
            <input
              type="datetime-local"
              id="endTIme"
              name="endTIme"
              className="form-control"
              defaultValue={moment(currentLog.endTIme).format("YYYY-MM-DDTHH:mm")}
              onChange={handleEndTime}
            />
          </div>
          <div className="modal-buttons">
            <button
              type="button"
              onClick={closeEditLogModal}
              className="cancel-button"
            >
              Cancel
            </button>
            <button type="submit" className="submit-button">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
)}

    </TableContainer>
  );
};

export default List;
