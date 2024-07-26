import moment from "moment";
import { Link } from "react-router-dom";
import defaultImage from "./assests/defaultImage.jpg";
import { Rating } from "@mui/material";
import apiUrl from "./api/ApiUrl";
import MentorSwitch from "./components/switch/MentorSwitch";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import toast from "react-hot-toast";

const editUserRole = async (id, isMentor) => {
  const response = await fetch(`${apiUrl.editUser.url}/${id}`, {
    method: apiUrl.editUser.method,
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ isMentor }),
  });

  const data = await response.json();
  if (data.success) {
    return data.data;
  } else {
    toast.error(data.message);
  }
};


const getScopeColor = (scope) => {
  switch (scope) {
    case "Web Application":
      return "#DC3954";
    case "Admin Panel":
      return "#154EEF";
    case "Mobile App Hybrid":
      return "green";
    case "Mobile App Ios":
      return "grey";
    case "Mobile App Android":
      return "#fbbf24";
    default:
      return "black";
  }
};

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
    field: "role",
    headerName: "Role",
    width: 230,
    renderCell: (params) => {
      return (
        <div style={{ textTransform: "uppercase" }}>{params.row.role}</div>
      );
    },
  },
  {
    field: "isMentor",
    headerName: "Mentor",
    width: 230,
    renderCell: (params) => {
      const handleToggleChange = async (newIsMentor) => {
        await editUserRole(params.row._id, newIsMentor);
      };

      return (
        <MentorSwitch
          isMentor={params.row.isMentor}
          onChange={handleToggleChange}
        />
      );
    },
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
    field: "id",
    headerName: "ID",
    width: 250,
    renderCell: (params) => {
      return (
        <div>
          <Link
            to={`/projects/${params.row._id}`}
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
    field: "name",
    headerName: "Name",
    width: 230,
  },
  {
    field: "type",
    headerName: "Type",
    width: 230,
  },
  {
    field: "description",
    headerName: "Description",
    width: 230,
  },
  {
    field: "projectStatus",
    headerName: "Status",
    width: 230,
    renderCell: (params) => {
      const status = params.row.projectStatus;
      let textColor, border;
      if (status) {
        switch (status) {
          case "in_progress":
            textColor = "#38a169";
            border = "1px solid #38a169";
            break;
          case "in_planning":
            textColor = "#fbbf24";
            border = "1px solid #fbbf24";
            break;
          case "on_hold":
            textColor = "#6b7280";
            border = "1px solid #6b7280";
            break;
          case "completed":
            textColor = "#3b82f6";
            border = "1px solid #3b82f6";
            break;
          case "in_support":
            textColor = "#a855f7";
            border = "1px solid #a855f7";
            break;
          default:
            textColor = "#ef4444";
            border = "1px solid #ef4444";
            break;
        }
      }

      return (
        <div
          style={{
            padding: "0.2rem 0.2rem",
            borderRadius: "5px",
            color: textColor,
            textAlign: "center",
            fontSize: "0.875rem",
            fontWeight: "bold",
            display: "inline-block",
            width: "150px",
            height: "30px",
            lineHeight: "30px",
            border: border,
          }}
        >
          {status}
        </div>
      );
    },
  },
  {
    field: "projectCode",
    headerName: "Code",
    width: 230,
  },
  {
    field: "projectScope",
    headerName: "Scope",
    width: 330,
    renderCell: (params) => (
      <div
        className="projectScope"
        style={{ display: "flex", flexWrap: "wrap" }}
      >
        {params.row.projectScope.map((scope, index) => {
          const color = getScopeColor(scope);
          return (
            <div
              key={index}
              className="scopeItem"
              style={{
                padding: "0.1rem 0.1rem",
                borderRadius: "5px",
                color: color,
                textAlign: "center",
                fontSize: "0.675rem",
                fontWeight: "bold",
                display: "flex",
                flexDirection: "row",
                width: "fit-content",
                height: "30px",
                lineHeight: "30px",
                border: `1px solid ${color}`,
                margin: "0.1rem 0.1rem",
                marginTop: "8px",
              }}
            >
              {scope}
            </div>
          );
        })}
      </div>
    ),
  },
  {
    field: "estimatedStartDate",
    headerName: "Estimated Start Date",
    width: 230,
    renderCell: (params) => (
      <div>{moment(params.row.estimatedStartDate).format("MMM DD, YYYY")}</div>
    ),
  },
  {
    field: "estimatedEndDate",
    headerName: "Estimated End Date",
    width: 230,
    renderCell: (params) => (
      <div>{moment(params.row.estimatedEndDate).format("MMM DD, YYYY")}</div>
    ),
  },
  {
    field: "actualStartDate",
    headerName: "Actual Start Date",
    width: 230,
    renderCell: (params) => (
      <div>{moment(params.row.actualStartDate).format("MMM DD, YYYY")}</div>
    ),
  },
  {
    field: "actualEndDate",
    headerName: "Actual End Date",
    width: 230,
    renderCell: (params) => (
      <div>
        {params.row.actualEndDate === null
          ? "-"
          : moment(params.row.actualEndDate).format("MMM DD, YYYY")}
      </div>
    ),
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

export const CategoriesColumn = [
  {
    field: "id",
    headerName: "ID",
    width: 250,
    renderCell: (params) => {
      return (
        <div
          style={{ textDecoration: "none", color: "green", cursor: "pointer" }}
        >
          {params.row._id}
        </div>
      );
    },
  },
  {
    field: "name",
    headerName: "Name",
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

export const FeedbackColumn = [
  {
    field: "id",
    headerName: "ID",
    width: 250,
    renderCell: (params) => {
      return (
        <div
          style={{ textDecoration: "none", color: "green", cursor: "pointer" }}
        >
          {params.row._id}
        </div>
      );
    },
  },
  {
    field: "Feedback",
    headerName: "Feedback",
    width: 500,
    renderCell: (params) => {
      return (
        <div style={{ textDecoration: "none" }}>{params.row.description}</div>
      );
    },
  },
  {
    field: "Sender",
    headerName: "Sender",
    width: 230,
    renderCell: (params) => {
      return (
        <div>
          <div
            style={{
              textDecoration: "none",
              color: params.row.isAnonymous === true ? "white" : "green",
            }}
          >
            {params.row.isAnonymous === true
              ? "Anonymous User"
              : params.row.user.username}
          </div>
        </div>
      );
    },
  },
  {
    field: "Rating",
    headerName: "Rating",
    width: 230,
    renderCell: (params) => {
      return (
        <Rating
          value={params.row.rating}
          readOnly
          precision={1}
          icon={<StarIcon style={{ color: "#ffc107" }} />}
          emptyIcon={<StarBorderIcon style={{ color: "#ffc107" }} />}
        />
      );
    },
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
