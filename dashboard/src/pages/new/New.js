import "./New.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import apiUrl from "../../api/ApiUrl";
import imageToBase64 from "../../helpers/imageToBase64";
import { useNavigate } from "react-router-dom";

const New = ({ inputs, title }) => {
  const navigate = useNavigate();

  const [file, setFile] = useState("");
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    profilePhoto: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleProfilePicture = async (e) => {
    const files = e.target.files[0];
    setFile(e.target.files[0]);
    const picture = await imageToBase64(files);
    setData((prev) => {
      return {
        ...prev,
        profilePhoto: picture,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(apiUrl.signUp.url, {
        method: apiUrl.signUp.method,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const dataApi = await res.json();
      if (dataApi.success) {
        setData({
          username: "",
          email: "",
          password: "",
          profilePhoto: "",
        });
        navigate("/users");
      } else {
        console.log("error: ", dataApi);
      }
    } catch (error) {
      console.error("error: ", error);
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form onSubmit={handleSubmit}>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={handleProfilePicture}
                  style={{ display: "none" }}
                />
              </div>

              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    name={input.name}
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={handleChange}
                  />
                </div>
              ))}
              <button>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
