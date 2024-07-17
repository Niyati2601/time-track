import './Datatable.scss';
import React, { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { userColumns } from '../../DataSource';
import { Link, useNavigate } from 'react-router-dom';
import apiUrl from '../../api/ApiUrl';
import { BiSolidEdit } from 'react-icons/bi';
import { MdDeleteOutline } from 'react-icons/md';
import {VscEye} from 'react-icons/vsc';

export default function DataTable() {
    const [users, setUsers] = React.useState([]);
    const navigate = useNavigate();

    const fetchUsers = async () => {
        const res = await fetch(apiUrl.getAllUsers.url, {
            method: apiUrl.getAllUsers.method,
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
        fetchUsers();
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`${apiUrl.deleteUserById.url}/${id}`, {
                method: apiUrl.deleteUserById.method,
                credentials: "include",
                headers: {
                  "content-type": "application/json",
                },
            });
            const data = await response.json();
            if (data.success) {
                fetchUsers();
            }
        } catch (error) {
            console.error('Failed to delete user:', error);
        }
    };

    const actionColumn = [{ 
        field: 'action', 
        headerName: 'Action', 
        width: 200, 
        renderCell: (params) => {
            return (
                <div className='cellAction'>
                    <span 
                        className='viewButton' 
                        onClick={() => navigate(`/users/${params.row._id}`)}
                    > 
                        <VscEye size={24} />
                    </span>
                    <span className='deleteButton' onClick={()=> handleDelete(params.row._id)}>
                        <MdDeleteOutline size={24} />
                    </span>
                </div>
            )
        }
    }]; 

    return (
        <div className='datatable'>
            <div className="datatableTitle">
                Add New User
                <Link to="/users/new" className="link">
                    Add New
                </Link>
            </div>
            <DataGrid
                className='datagrid'
                rows={users}
                columns={userColumns.concat(actionColumn)}
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
        </div>
    );
}
