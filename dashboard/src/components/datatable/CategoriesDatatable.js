import { useState } from "react";
import "./Datatable.scss";
import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { CategoriesColumn } from "../../DataSource";
import { useNavigate } from "react-router-dom";
import apiUrl from "../../api/ApiUrl";
import { MdDeleteOutline, MdEdit } from "react-icons/md";
import { VscEye } from "react-icons/vsc";
import toast from "react-hot-toast";

export default function CategoriesDataTable() {
    const [categories, setCategories] = useState([]);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deleteCategoryId, setDeleteCategoryId] = useState("");
    const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
    const [isEditCategoryModalOpen, setIsEditCategoryModalOpen] = useState(false);
    const [categoryName, setCategoryName] = useState("");
    const [editCategoryId, setEditCategoryId] = useState("");

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
            setCategories(data.data);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
    };

    const closeAddCategoryModal = () => {
        setIsAddCategoryModalOpen(false);
    };

    const closeEditCategoryModal = () => {
        setIsEditCategoryModalOpen(false);
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
                toast.success("Category deleted successfully");
                fetchCategories();
                setIsDeleteModalOpen(false);
            }
        } catch (error) {
            console.error("Failed to delete category:", error);
        }
    };

    const handleAddCategory = async (e) => {
        // e.preventDefault();
        const category = {
            name: categoryName,
        };
        try {
            const response = await fetch(apiUrl.addCategory.url, {
                method: apiUrl.addCategory.method,
                credentials: "include",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(category),
            });

            const data = await response.json();
            if (data.success) {
                fetchCategories();
                setIsAddCategoryModalOpen(false);
                setCategoryName("");
            }
        } catch (error) {
            console.error("Failed to add category:", error);
        }
    };

    const handleEditCategory = async (e) => {
        e.preventDefault();
        const category = {
            name: categoryName,
        };
        try {
            const response = await fetch(`${apiUrl.editCategory.url}/${editCategoryId}`, {
                method: apiUrl.editCategory.method,
                credentials: "include",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(category),
            });

            const data = await response.json();
            if (data.success) {
                fetchCategories();
                setIsEditCategoryModalOpen(false);
                setCategoryName("");
                setEditCategoryId("");
                toast.success("Category updated successfully");
            }
        } catch (error) {
            console.error("Failed to edit category:", error);
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
                        {/* <span
                            className="viewButton"
                            onClick={() => navigate(`/categories/${params.row._id}`)}
                        >
                            <VscEye size={24} />
                        </span> */}
                        <span
                            className="viewButton"
                            onClick={() => {
                                setIsEditCategoryModalOpen(true);
                                setEditCategoryId(params.row._id);
                                setCategoryName(params.row.name);
                            }}
                        >
                            <MdEdit size={24} />
                        </span>
                        <span
                            className="deleteButton"
                            onClick={() => {
                                setIsDeleteModalOpen(true);
                                setDeleteCategoryId(params.row._id);
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
                <span className="link" onClick={() => setIsAddCategoryModalOpen(true)}>
                    Add Category
                </span>
            </div>
            <div className="datatableContainer">
                <DataGrid
                    className="datagrid"
                    rows={categories}
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
                {/* Add Category Modal */}
                {isAddCategoryModalOpen && (
                    <div className="add-category-modal">
                        <div className="add-category-modal-overlay">
                            <div className="add-category-modal-content">
                                <h2 className="modal-title">Add Category</h2>
                                <form onSubmit={handleAddCategory}>
                                    <div className="form-group">
                                        <label htmlFor="categoryName">Category Name</label>
                                        <input
                                            type="text"
                                            id="categoryName"
                                            name="categoryName"
                                            value={categoryName}
                                            onChange={(e) => setCategoryName(e.target.value)}
                                            className="form-control"
                                            placeholder="Enter category name"
                                            required
                                        />
                                    </div>
                                    <div className="modal-buttons">
                                        <button
                                            type="button"
                                            onClick={closeAddCategoryModal}
                                            className="cancel-button"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="submit-button"
                                        >
                                            Add
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
                {/* Edit Category Modal */}
                {isEditCategoryModalOpen && (
                    <div className="edit-category-modal">
                        <div className="edit-category-modal-overlay">
                            <div className="edit-category-modal-content">
                                <h2 className="modal-title">Edit Category</h2>
                                <form onSubmit={handleEditCategory}>
                                    <div className="form-group">
                                        <label htmlFor="categoryName">Category Name</label>
                                        <input
                                            type="text"
                                            id="categoryName"
                                            name="categoryName"
                                            value={categoryName}
                                            onChange={(e) => setCategoryName(e.target.value)}
                                            className="form-control"
                                            placeholder="Enter category name"
                                            required
                                        />
                                    </div>
                                    <div className="modal-buttons">
                                        <button
                                            type="button"
                                            onClick={closeEditCategoryModal}
                                            className="cancel-button"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="submit-button"
                                        >
                                            Edit
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
                {/* Delete Category Modal */}
                {isDeleteModalOpen && (
                    <div className="delete-modal">
                        <div className="delete-modal-overlay">
                            <div className="delete-modal-content">
                                <h2 className="modal-title">
                                    Are you sure you want to delete this category?
                                </h2>
                                <div className="modal-buttons">
                                    <button
                                        onClick={() => handleDelete(deleteCategoryId)}
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
                    </div>
                )}
            </div>
        </div>
    );
}
