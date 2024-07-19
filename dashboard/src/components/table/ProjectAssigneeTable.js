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
import { Link, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import moment from "moment";

const ProjectAssigneeTable = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  console.log('data: ', data);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleAssignees = async () => {
    try {
      const response = await fetch(`${apiUrl.getAssigneesByProjectId.url}/${id}`, {
        method: apiUrl.getAssigneesByProjectId.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
      });
      const data = await response.json();
      console.log('data: ', data);
      setData(data?.data || []); // Ensure that data is an array
    } catch (error) {
      console.error('Failed to fetch logs:', error);
      setData([]); // Set data to an empty array on error
    }
  };

  useEffect(() => {
    handleAssignees();
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

  const userId = data.map((user) => user._id)
  console.log('userId: ', userId);

  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">ID</TableCell>
            <TableCell className="tableCell">Username</TableCell>
            <TableCell className="tableCell">Email</TableCell>
            <TableCell className="tableCell">Created At</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : data
          ).map((project) => {
            return(
         
            <TableRow key={project._id}>
              <TableCell className="tableCell-id">
                <Link to={`/users/${project._id}`} className="" style={{textDecoration: "none", color:"green"}}>
                {project._id}</Link> </TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper">
                  <img
                    src={project.profilePhoto}
                    alt={project.username}
                    className="image"
                  />
                  <span className="name">{project.username}</span>
                </div></TableCell>
              <TableCell className="tableCell">{project.email}</TableCell>
              <TableCell className="tableCell">
                {moment(project.createdAt).format("DD/MM/YYYY")}
              </TableCell>
            </TableRow>
          )})}
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

export default ProjectAssigneeTable;
