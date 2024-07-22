import "./ProjectAssignedForUsers.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import apiUrl from "../../api/ApiUrl";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import moment from "moment";
import { TablePagination } from "@mui/material";
const ProjectAssignedForUsers = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleProjects = async () => {
    try {
      const response = await fetch(`${apiUrl.getProjectsByUserIdAdmin.url}/${id}`, {
        method: apiUrl.getProjectsByUserIdAdmin.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
      });
      const data = await response.json();
      setData(data.data || []);
    } catch (error) {
      console.error('Failed to fetch feedbacks:', error);
    }
  };

  useEffect(() => {
    handleProjects();
  }, [id]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper} className="project-table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">ID</TableCell>
            <TableCell className="tableCell">Type</TableCell>
            <TableCell className="tableCell">Name</TableCell>
            <TableCell className="tableCell">Description</TableCell>
            <TableCell className="tableCell">Scope</TableCell>
            <TableCell className="tableCell">Estimated Start Date</TableCell>
            <TableCell className="tableCell">Estimated End Date</TableCell>
            <TableCell className="tableCell">Actual Start Date</TableCell>
            <TableCell className="tableCell">Actual End Date</TableCell>
            <TableCell className="tableCell">Created At</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : data
          ).map((project) => (
            <TableRow key={project._id}>
              <TableCell className="tableCell-id">{project._id}</TableCell>
              <TableCell className="tableCell">{project.type}</TableCell>
              <TableCell className="tableCell">{project.name}</TableCell>
              <TableCell className="tableCell">{project.description ? project.description : '-'}</TableCell>
              <TableCell className="tableCell">{project.projectScope ? project.projectScope : '-'}</TableCell>
              <TableCell className="tableCell">{ project.estimatedStartDate  ? moment(project.estimatedStartDate).format("DD/MM/YYYY") : 'N/A' }</TableCell>
              <TableCell className="tableCell">{ project.estimatedEndDate  ? moment(project.estimatedEndDate).format("DD/MM/YYYY") : 'N/A' }</TableCell>
              <TableCell className="tableCell">{ project.actualStartDate  ? moment(project.actualStartDate).format("DD/MM/YYYY") : 'N/A' }</TableCell>
              <TableCell className="tableCell">{ project.actualEndDate  ? moment(project.actualEndDate).format("DD/MM/YYYY") : 'N/A' }</TableCell>
              <TableCell className="tableCell">{moment(project.createdAt).format("DD/MM/YYYY")}</TableCell>
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
    </TableContainer>
  );
};

export default ProjectAssignedForUsers;
