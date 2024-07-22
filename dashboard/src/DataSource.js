import moment from "moment";
import { Link } from "react-router-dom";
import defaultImage from "./assests/defaultImage.jpg";
export const userColumns = [
  {
    field: "id",
    headerName: "ID",
    width: 250,
    renderCell: (params) => {
      return (
        <div>
          <Link
            to={`/users/${params.row._id}`}
            key={params.row._id}
            style={{ textDecoration: "none", color: "green" }}
          >
            {params.row._id}
          </Link>
        </div>
      );
    },
  },
  {
    field: "username",
    headerName: "User",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img
            className="cellImg"
            src={
              params.row.profilePhoto ? params.row.profilePhoto : defaultImage
            }
            alt="avatar"
          />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },
  {
    field: "createdAt",
    headerName: "Created At",
    width: 230,
    renderCell: (params) => {
      return <div>{moment(params.row.createdAt).format("MMM DD, YYYY")}</div>;
    },
  },
];

export const projectColumns = [
  {
    field: 'id', headerName: 'ID', width: 250,
    renderCell: (params) => {
      return (

        <div>
          <Link to={`/projects/${params.row._id}`} key={params.row._id} style={{ textDecoration: 'none', color: 'green' }}>
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
    field: 'projectStatus',
    headerName: 'Status',
    width: 230,
    renderCell: (params) => {
      const status = params.row.projectStatus;
      let backgroundColor, textColor, border;
      if (status) {
        switch (status) {
          case 'in_progress':
            // backgroundColor = '#38a169'; // Green
            textColor = '#38a169'; // White
            border = '1px solid #38a169';
            break;
          case 'in_planning':
            // backgroundColor = '#fbbf24'; // Yellow
            textColor = '#fbbf24'; // White
            border = '1px solid #fbbf24';
            break;
          case 'on_hold':
            // backgroundColor = '#6b7280'; // Gray
            textColor = '#6b7280'; // White
            border = '1px solid #6b7280';
            break;
          case 'completed':
            // backgroundColor = '#3b82f6'; // Blue
            textColor = '#3b82f6'; // White
            border = '1px solid #3b82f6';
            break;
          case 'in_support':
            // backgroundColor = '#a855f7'; // Purple
            textColor = '#a855f7'; // White
            border = '1px solid #a855f7';
            break;
          default:
            // backgroundColor = '#ef4444'; // Red
            textColor = '#ef4444'; // White
            border = '1px solid #ef4444';
            break;
        }
      }

      return (
        <div
          style={{
            padding: '0.2rem 0.2rem',
            borderRadius: '12px',
            backgroundColor: backgroundColor,
            color: textColor,
            textAlign: 'center',
            fontSize: '0.875rem',
            fontWeight: 'bold',
            display: 'inline-block',
            width: '150px',
            height: '30px',
            lineHeight: '30px',
            border: border,
          }}
        >
          {status}
        </div>
      );
    }
  },
  {
    field: 'projectCode',
    headerName: 'Code',
    width: 230,
  },
  {
    field: 'projectScope',
    headerName: 'Scope',
    width: 230,
  },
  {
    field: 'estimatedStartDate',
    headerName: 'Estimated Start Date',
    width: 230,
    renderCell: (params) => (
      <div>{moment(params.row.estimatedStartDate).format("MMM DD, YYYY")}</div>
    )
  },
  {
    field: 'estimatedEndDate',
    headerName: 'Estimated End Date',
    width: 230,
    renderCell: (params) => (
      <div>{moment(params.row.estimatedEndDate).format("MMM DD, YYYY")}</div>
    )
  },
  {
    field: 'actualStartDate',
    headerName: 'Actual Start Date',
    width: 230,
    renderCell: (params) => (
      <div>{moment(params.row.actualStartDate).format("MMM DD, YYYY")}</div>
    )
  },
  {
    field: 'actualEndDate',
    headerName: 'Actual End Date',
    width: 230,
    renderCell: (params) => (
      <div>{params.row.actualEndDate===null ? "-" : moment(params.row.actualEndDate).format("MMM DD, YYYY")}</div>
    )
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

export const CategoriesColumn = [
  {
    field: 'id', headerName: 'ID', width: 250,
    renderCell: (params) => {
      return (

        <div>
          <Link to={`/projects/${params.row._id}`} key={params.row._id} style={{ textDecoration: 'none', color: 'green' }}>
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
    field: 'createdAt',
    headerName: 'Created At',
    width: 230,
    renderCell: (params) => {
      return <div>{moment(params.row.createdAt).format("MMM DD, YYYY")}</div>
    }
  }
];