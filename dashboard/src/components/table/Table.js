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

const List = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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
      console.log('data: ', data);
      setData(data?.data || []); // Ensure that data is an array
    } catch (error) {
      console.error('Failed to fetch logs:', error);
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
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : data
          ).map((log) => (
            <TableRow key={log._id}>
              <TableCell className="tableCell">{log._id}</TableCell>
              <TableCell className="tableCell">{log.title}</TableCell>
              <TableCell className="tableCell">{log.tags}</TableCell>
              <TableCell className="tableCell">{log.projects}</TableCell>
              <TableCell className="tableCell">
                {formatTime(log.startTIme)} - {formatTime(log.endTIme)}
              </TableCell>
              <TableCell className="tableCell">{log.duration}</TableCell>
              <TableCell className="tableCell">
                {moment(log.createdAt).format("DD/MM/YYYY")}
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
    </TableContainer>
  );
};

export default List;
