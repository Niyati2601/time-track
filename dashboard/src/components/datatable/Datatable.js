import './Datatable.scss';
import React, { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { userColumns } from '../../DataSource';
import {Link} from 'react-router-dom';
import apiUrl from '../../api/ApiUrl';



export default function DataTable() {
    const [users, setUsers] = React.useState([]);
    const fetchUsers = async() => {
        const res = await fetch(apiUrl.getAllUsers.url, {
            method: apiUrl.getAllUsers.method,
            credentials: "include",
            headers: {
              "content-type": "application/json",
            },
        })

        const data = await res.json();
        if (data.success) {
            setUsers(data.data);
        }
    }
    useEffect(()=> {
        fetchUsers()
    },[])
    const actionColumn = [{ field: 'action', headerName: 'Action', width:200, renderCell: ()=> {
        return (
            <div className='cellAction'>
                <div className='viewButton'>View</div>
                <div className='deleteButton'>Delete</div>
            </div>
        )
    }}]; 
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
                        paginationModel: { page: 0, pageSize: 9 },
                    },
                }}
                pageSizeOptions={[5, 10]} 
                checkboxSelection
            />
        </div>
    );
}
