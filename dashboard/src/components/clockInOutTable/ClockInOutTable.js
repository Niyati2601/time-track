import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react';
import apiUrl from '../../api/ApiUrl';
import { useParams } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import toast from 'react-hot-toast';
import moment from 'moment';
import './Clock.scss';

const ClockInOutTable = () => {
  const { id } = useParams();

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [isEditClockModalOpen, setIsEditClockModalOpen] = useState(false);
  const [editClockData, setEditClockData] = useState({
    _id: '',
    clockInTime: '',
    clockOutTime: '',
    createdAt: '',
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const fetchClockInOut = async () => {
    try {
      const response = await fetch(apiUrl.clockInOut.url, {
        method: apiUrl.clockInOut.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          userId: id,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setData(data.history || []);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchClockInOut();
  }, []);

  const handleEditClock = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${apiUrl.editClock.url}/${editClockData._id}`, {
        method: apiUrl.editClock.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(editClockData),
      });

      const result = await res.json();
      if (result.success) {
        toast.success('Clock entry updated successfully');
        fetchClockInOut();
        setIsEditClockModalOpen(false);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleEditClick = (clock) => {
    setEditClockData({
      _id: clock._id,
      clockInTime: moment(clock.clockInTime).format("YYYY-MM-DDTHH:mm"),
      clockOutTime: clock.clockOutTime ? moment(clock.clockOutTime).format("YYYY-MM-DDTHH:mm") : '',
      createdAt: moment(clock.createdAt).format("YYYY-MM-DD"),
    });
    setIsEditClockModalOpen(true);
  };

  const closeIsEditClockModalOpen = () => {
    setIsEditClockModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditClockData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <TableContainer component={Paper} className="clock-table">
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
              <TableCell className="tableCell">{clock.clockOutTime ? moment(clock.clockOutTime).format("hh:mm A") : 'N/A'}</TableCell>
              <TableCell className="tableCell">{clock.duration || 'N/A'}</TableCell>
              <TableCell className="tableCell">{moment(clock.createdAt).format("DD/MM/YYYY") || 'N/A'}</TableCell>
              <TableCell className="tableCell" onClick={() => handleEditClick(clock)} ><EditIcon style={{ cursor: 'pointer' }} /></TableCell>
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
      {isEditClockModalOpen && (
        <div className="edit-clock-modal">
          <div className="edit-clock-modal-overlay">
            <div className="edit-clock-modal-content">
              <h2 className="modal-title">Edit Clock Entry</h2>
              <form onSubmit={handleEditClock}>
                <div className="form-group">
                  <label htmlFor="clockInTime">Clock In Time</label>
                  <input
                    type="datetime-local"
                    id="clockInTime"
                    name="clockInTime"
                    value={editClockData.clockInTime}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="clockOutTime">Clock Out Time</label>
                  <input
                    type="datetime-local"
                    id="clockOutTime"
                    name="clockOutTime"
                    value={editClockData.clockOutTime}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="createdAt">Created At</label>
                  <input
                    type="date"
                    id="createdAt"
                    name="createdAt"
                    value={editClockData.createdAt}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="modal-buttons">
                  <button
                    type="button"
                    onClick={closeIsEditClockModalOpen}
                    className="cancel-button"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="submit-button"
                  >
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

export default ClockInOutTable;
