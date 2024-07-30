import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { FeedbackColumn } from "../../DataSource";
import apiUrl from "../../api/ApiUrl";
import toast from "react-hot-toast";

const FeedbackDataTable = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteFeedbackId, setDeleteFeedbackId] = useState("");

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const getFeedbacks = async () => {
    try {
      const res = await fetch(apiUrl.getGeneralFeedbacks.url, {
        method: apiUrl.getGeneralFeedbacks.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
      });
      const data = await res.json();
      if (data.success) {
        setFeedbacks(data.data);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDeleteFeedbacks = async (id) => {
    try {
      const response = await fetch(`${apiUrl.deleteFeedbacks.url}/${id}`, {
        method: apiUrl.deleteFeedbacks.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
      });
      const data = await response.json();
      if (data.success) {
        toast.success(data.message);
        getFeedbacks();
        closeDeleteModal();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getFeedbacks();
  }, []);

  const handleDelete = (id) => {
    setDeleteFeedbackId(id);
    setIsDeleteModalOpen(true);
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <span className="deleteButton" style={{ marginRight: "auto" }}>
              <MdDeleteOutline size={24} onClick={() => handleDelete(params.row._id)}/>
            </span>
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable">
      <div className="datatableTitle">Feedbacks</div>
      <div className="datatableContainer">
        <DataGrid
          className="datagrid"
          rows={feedbacks}
          columns={FeedbackColumn.concat(actionColumn)}
          getRowId={(row) => row._id}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSize={10}
          pageSizeOptions={[5, 10]}
          rowsPerPageOptions={[5, 10]}
          checkboxSelection
        />
        {isDeleteModalOpen && (
            <div className="delete-modal">
                <div className="delete-modal-overlay">
                    <div className="delete-modal-content">
                        <h2 className="modal-title">
                            Are you sure you want to delete this Feedback?
                        </h2>
                        <div className="modal-buttons">
                            <button
                                className="delete-button"
                                onClick={() => handleDeleteFeedbacks(deleteFeedbackId)}
                            >
                                Delete
                            </button>
                            <button onClick={closeDeleteModal} className="cancel-button">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackDataTable;
