import moment from 'moment'
import { Link } from 'react-router-dom';
import defaultImage from './assests/defaultImage.jpg';
export const userColumns = [
    {
        field: 'id', headerName: 'ID', width: 250,
        renderCell: (params) => {
            return (

                <div>
                    <Link to={`/users/${params.row._id}`} key={params.row._id} style={{textDecoration:'none', color:'green'}}>
                    {params.row._id}
                    </Link>
                </div>

            )
        }

    },
    {
        field: 'username',
        headerName: 'User',
        width: 230,
        renderCell: (params) => {
            return (
                <div className='cellWithImg'>
                    <img className='cellImg' src={params.row.profilePhoto ? params.row.profilePhoto : defaultImage} alt='avatar' />
                    {params.row.username}
                </div>
            );
        },
    },
    {
        field: 'email',
        headerName: 'Email',
        width: 230,
    },
    {
        field: 'createdAt',
        headerName: 'Created At',
        width: 230,
        renderCell: (params) => {
            return <div>{moment(params.row.createdAt).format("MMM DD, YYYY")}</div>
        }
    }
];

export const projectColumns = [
    {
        field: 'id', headerName: 'ID', width: 250,
        renderCell: (params) => {
            return (

                <div>
                    <Link to={`/projects/${params.row._id}`} key={params.row._id} style={{textDecoration:'none', color:'green'}}>
                    {params.row._id}
                    </Link>
                </div>

            )
        }

    },
    {
        field: 'name',
        headerName: 'Name',
        width: 230,
    },
    {
        field: 'type',
        headerName: 'Type',
        width: 230,
    },
    {
        field: 'description',
        headerName: 'Description',
        width: 230,
    },
    {
        field: 'createdAt',
        headerName: 'Created At',
        width: 230,
        renderCell: (params) => {
            return <div>{moment(params.row.createdAt).format("MMM DD, YYYY")}</div>
        }
    }

];