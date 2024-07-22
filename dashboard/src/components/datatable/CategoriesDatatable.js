import { useState } from "react";
import "./Datatable.scss";
import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { CategoriesColumn, userColumns } from "../../DataSource";
import { Link, useNavigate } from "react-router-dom";
import apiUrl from "../../api/ApiUrl";
import { BiSolidEdit } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import { VscEye } from "react-icons/vsc";

export default function CategoriesDataTable() {
    const [users, setUsers] = useState([]);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deleteUserId, setDeleteUserId] = useState("");

    const navigate = useNavigate();

    const fetchCategories = async () => {
        const res = await fetch(apiUrl.getCategories.url, {
            method: apiUrl.getCategories.method,
            credentials: "include",
            headers: {
                "content-type": "application/json",
            },
        });

        const data = await res.json();
        if (data.success) {
            setUsers(data.data);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);
    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`${apiUrl.deleteCategory.url}/${id}`, {
                method: apiUrl.deleteCategory.method,
                credentials: "include",
                headers: {
                    "content-type": "application/json",
                },
            });
            const data = await response.json();
            if (data.success) {
                fetchCategories();
                setIsDeleteModalOpen(false);
            }
        } catch (error) {
            console.error("Failed to delete user:", error);
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
                Categories
                <Link to="/users/new" className="link">
                    Add Categories
                </Link>
            </div>
            <div className="datatableContainer">
                <DataGrid
                    className="datagrid"
                    rows={users}
                    columns={CategoriesColumn.concat(actionColumn)}
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
                <div className="delete-modal">
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
                </div>
            </div>
        </div>
    );
}
