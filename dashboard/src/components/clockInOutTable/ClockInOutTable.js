import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react'
import apiUrl from '../../api/ApiUrl';
import { useParams } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import toast from 'react-hot-toast';
import moment from 'moment';

const ClockInOutTable = () => {
  const { id } = useParams();

    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      };

      const fetchClockInOut = async() => {
          try {
            const response = await fetch(apiUrl.clockInOut.url, {
              method: apiUrl.clockInOut.method,
              credentials: "include",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify({
                userId: id
              }),
            })

            const data = await response.json();
            if (data.success) {
                setData(data.history || []);
            }
          } catch (error) {
            toast.error(error.message);
          }
      }

      useEffect(() => {
        fetchClockInOut();
      }, []);


  return (
    <TableContainer component={Paper} className="project-table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">ID</TableCell>
            <TableCell className="tableCell">Clock In Time</TableCell>
            <TableCell className="tableCell">Clock Out Time</TableCell>
            <TableCell className="tableCell">Duration(in Hrs)</TableCell>
            <TableCell className="tableCell">Created At</TableCell>
            <TableCell className="tableCell">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : data
          ).map((clock) => (
            <TableRow key={clock._id}>
              <TableCell className="tableCell-id">{clock._id}</TableCell>
              <TableCell className="tableCell">{moment(clock.clockInTime).format("hh:mm A")}</TableCell>
              <TableCell className="tableCell">{clock.clockOutTime ? moment(clock.clockOutTime).format("hh:mm A"): 'N/A'}</TableCell>
              <TableCell className="tableCell">{clock.duration || 'N/A'}</TableCell>
              <TableCell className="tableCell">{moment(clock.createdAt).format("DD/MM/YYYY") || 'N/A'}</TableCell>
              <TableCell className="tableCell"><EditIcon style={{cursor: 'pointer'}}/></TableCell>
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
  )
}

export default ClockInOutTable;
