import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdAddAPhoto } from "react-icons/md";
import imageToBase64 from "../helpers/imageToBase64";
import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
import apiUrl from "../api/Api";


const Signup = () => {
//   const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmPassword] = useState(false);
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     
      if(data.password === data.confirmPassword){

        const dataResponse = await fetch(apiUrl.signUp.url,{
            method : apiUrl.signUp.method,
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify(data)
          })
    
          const dataApi = await dataResponse.json()

          if(dataApi.success){
            toast.success(dataApi.message)
            setData({
              username: "",
              email: "",
              password: "",
              confirmPassword: "",
              profilePhoto: "",
            })
            // navigate("/login")
          }

          if(dataApi.error){
            toast.error(dataApi.message)
          }
    
      }else{
        toast.error("Please check password and confirm password")
      }
    console.log("Entered data",data);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const handleProfilePicture = async (e) => {
    const file = e.target.files[0];
    const picture = await imageToBase64(file);
    setData((prev) => {
      return {
        ...prev,
        profilePhoto: picture,
      };
    });
  };
  return (
    <section className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div>
            <img src={Logo} className="w-32 mx-auto" alt="logo" />
          </div>
          <div className="mt-12 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold">Sign up</h1>
            <form className="w-full flex-1 mt-8" onSubmit={handleSubmit}>
              <label>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleProfilePicture}
                />
                <div className="mx-auto max-w-xs flex cursor-pointer ">
                  <div className="mb-5 text-2xl">
                    {data.profilePhoto ? (
                      <img
                        src={data.profilePhoto}
                        alt="profile"
                        className="w-20 rounded-full h-20"
                      />
                    ) : (
                      <MdAddAPhoto />
                    )}
                  </div>
                  <div className="text-center ml-2">Upload Photo</div>
                </div>
              </label>

              <div className="mx-auto max-w-xs">
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="text"
                  placeholder="Username"
                  name="username"
                  onChange={handleChange}
                  value={data.username}
                  required
                />
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  type="email"
                  placeholder="Email"
                  name="email"
                  onChange={handleChange}
                  value={data.email}
                  required
                />
                <div className="relative mt-5">
                  <input
                    className="w-full px-8 py-4 pr-12 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    name="password"
                    onChange={handleChange}
                    value={data.password}
                    required
                  />
                  <div
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </div>
                </div>
                <div className="relative mt-5">
                  <input
                    className="w-full px-8 py-4 pr-12 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    onChange={handleChange}
                    value={data.confirmPassword}
                    required
                  />
                  <div
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 cursor-pointer"
                    onClick={() => setConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </div>
                </div>
                <button className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                  <svg
                    className="w-6 h-6 -ml-2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="8.5" cy="7" r="4" />
                    <path d="M20 8v6M23 11h-6" />
                  </svg>
                  <span className="ml-3">Sign Up</span>
                </button>
                <p className="mt-6 text-xs text-gray-600 text-center">
                  Already a member?
                  <Link
                    to="/login"
                    className="border-b border-gray-500 border-dotted"
                  >
                    Login
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
        <div className="flex-1 bg-blue-100 text-center hidden lg:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage:
                "url(https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg)",
            }}
          ></div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
