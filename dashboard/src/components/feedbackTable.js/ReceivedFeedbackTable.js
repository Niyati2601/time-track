import "./FeedbackTable.scss";
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
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const ReceivedFeedbackTable = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleFeedbacks = async () => {
    try {
      const response = await fetch(`${apiUrl.getReceivedFeedbacks.url}/${id}`, {
        method: apiUrl.getReceivedFeedbacks.method,
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
    handleFeedbacks();
  }, [id]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper} className="feedback-table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">ID</TableCell>
            <TableCell className="tableCell">Type</TableCell>
            <TableCell className="tableCell">Description</TableCell>
            <TableCell className="tableCell">isAnonymous</TableCell>
            <TableCell className="tableCell">Sender</TableCell>
            <TableCell className="tableCell">Sender Id</TableCell>
            <TableCell className="tableCell">Rating</TableCell>
            <TableCell className="tableCell">Created At</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : data
          ).map((feedback) => (
            <TableRow key={feedback._id}>
              <TableCell className="tableCell-id">{feedback._id}</TableCell>
              <TableCell className="tableCell">{feedback.type}</TableCell>
              <TableCell className="tableCell">{feedback.description}</TableCell>
              <TableCell className="tableCell">{feedback.isAnonymous ? "True" : "False"}</TableCell>
              <TableCell className="tableCell">{feedback.isAnonymous === true ? "Anonymous" : feedback.username ? feedback.username : "-"}</TableCell>
              <TableCell className="tableCell">{feedback.isAnonymous === true ? "Anonymous" : feedback.user ? feedback.user : "-"}</TableCell>
              <TableCell className="tableCell">
                <Rating
                  value={feedback.rating}
                  readOnly
                  precision={1}
                  icon={<StarIcon style={{ color: '#ffc107' }} />}
                  emptyIcon={<StarBorderIcon style={{ color: '#ffc107' }} />}
                />
              </TableCell>
              <TableCell className="tableCell">{moment(feedback.createdAt).format("DD/MM/YYYY")}</TableCell>
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

export default ReceivedFeedbackTable;
