import "./Profile.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import apiUrl from "../../api/ApiUrl";
import { useDispatch } from "react-redux";
import { setAdminDetails } from "../../redux/adminSlice";
import imageToBase64 from "../../helpers/imageToBase64";

const Profile = () => {
    const [userData, setUserData] = useState({});
    const [editable, setEditable] = useState(false);
    const [file, setFile] = useState(null);
    const dispatch = useDispatch();

    const fetchAdminDetails = async () => {
        try {
            const res = await fetch(apiUrl.adminDetails.url, {
                method: apiUrl.adminDetails.method,
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await res.json();
            if (data.success) {
                dispatch(setAdminDetails(data.data));
                setUserData(data.data);
            } else {
                console.error('Failed to fetch admin details:', data.message);
            }
        } catch (error) {
            console.error('Error fetching admin details:', error);
        }
    };

    useEffect(() => {
        fetchAdminDetails();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleProfilePicture = async (e) => {
        const file = e.target.files[0];
        const picture = await imageToBase64(file);
        setUserData((prev) => ({
            ...prev,
            profilePhoto: picture,
        }));
        setFile(file); // Update file state for image preview
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedData = {
            name: userData.adminName,
            email: userData.email,
            profilePhoto: userData.profilePhoto,
        };

        try {
            const res = await fetch(apiUrl.editProfile.url, {
                method: apiUrl.editProfile.method,
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            });

            const data = await res.json();
            if (data.success) {
                dispatch(setAdminDetails(data.data));
                setUserData(data.data);
                setEditable(false);
            } else {
                console.error('Failed to update profile:', data.message);
            }
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    const handleEdit = () => {
        setEditable(true);
    };

    return (
        <div className="profile">
            <Sidebar />
            <div className="profileContainer">
                <Navbar />
                <div className="top">
                    <h1>Profile</h1>
                    <button className="edit-button" onClick={handleEdit}>Edit</button>
                </div>
                <div className="bottom">
                    <div className="left">
                        <label htmlFor="file" className="profilePictureLabel">
                            <input
                                type="file"
                                id="file"
                                onChange={handleProfilePicture}
                                className="fileInput"
                                disabled={!editable}
                                style={{ display: "none" }}
                            />
                            <img
                                src={
                                    file
                                        ? URL.createObjectURL(file)
                                        : userData.profilePhoto || "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                                }
                                alt="Profile"
                                className="profilePicture"
                            />
                            <div className="uploadText">
                                <DriveFolderUploadOutlinedIcon className="icon" style={{marginTop:'2px'}} />
                                Upload Profile Picture
                            </div>
                        </label>
                    </div>
                    <div className="right">
                        <form onSubmit={handleSubmit}>
                            <div className="formInput">
                                <label>Name</label>
                                <input
                                    name="adminName"
                                    type="text"
                                    value={userData.adminName || ""}
                                    onChange={handleChange}
                                    disabled={!editable}
                                />
                            </div>
                            <div className="formInput">
                                <label>Email</label>
                                <input
                                    name="email"
                                    type="text"
                                    value={userData.email || ""}
                                    onChange={handleChange}
                                    disabled={!editable}
                                />
                            </div>
                            <button type="submit" disabled={!editable}>Save</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
