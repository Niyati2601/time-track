import React, { useState } from "react";
import { useSelector } from "react-redux";
import { CgProfile } from "react-icons/cg";
import { RiLogoutCircleRLine } from "react-icons/ri";
import EditProfile from "../pages/EditProfile";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { useNavigate } from "react-router-dom";
import apiUrl from "../api/Api";
import toast from "react-hot-toast";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const MySwal = withReactContent(Swal);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setOpen(!open);
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleLogout = async () => {
    try {
      // Call the logout API
      const res = await fetch(apiUrl.logout.url, {
        method: apiUrl.logout.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
      });

      const data = await res.json();

      // Check if logout was successful
      if (data.success) {
        // toast.success("Logout Successful");
       navigate('/')
      } else {
        // toast.error("Logout Failed");
      }
    } catch (error) {
      toast.error("Error logging out");
    }
  };

  const confirmLogout = () => {
    MySwal.fire({
      title: "Are you sure you want to logout?",
      showCancelButton: true,
      confirmButtonText: "Yes, Logout!",
      cancelButtonText: "No, stay!",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        // Call handleLogout to initiate logout process
        MySwal.fire({
          title: "SuccessFull",
          text: "User logged out successfully :)",
          icon: "success",
          confirmButtonText: "Ok",
        });
        handleLogout();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        MySwal.fire({
          title: "Cancelled",
          text: "Your session is safe :)",
          icon: "error",
        });
      }
    });
  };

  return (
    <div className="p-2 relative">
      <div className="py-3 px-3 w-full bg-white shadow-md">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-xl">Dashboard</div>
          <div className="flex items-center gap-2 relative">
            {user && (
              <img
                className="inline-block w-8 h-8 rounded-full ring-2 ring-white cursor-pointer"
                src={
                  user?.user?.profilePhoto ||
                  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                }
                alt=""
                onClick={toggleDropdown}
              />
            )}
            {open && (
              <div
                id="dropdownAvatarName"
                className="z-10 divide-y divide-gray-100 rounded-lg shadow w-48 bg-[#283046] dark:divide-gray-600 absolute right-0 top-9"
              >
                <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                  <div className="font-medium">{user?.user?.username}</div>
                  <div className="truncate">{user?.user?.email}</div>
                </div>
                <ul
                  className="py-2 text-md text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownAvatarNameButton"
                >
                  <li>
                    <button
                      onClick={toggleModal}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white flex items-center gap-2"
                    >
                      <CgProfile />
                      Profile
                    </button>
                  </li>
                </ul>
                <div className="py-2 text-md">
                  <button
                    onClick={confirmLogout}
                    className="block w-full text-left px-4 py-2 text-gray-700 bg-primary hover:bg-primary-dark dark:bg-primary-dark hover:text-white dark:text-gray-200 dark:hover:text-white flex items-center gap-2 rounded"
                  >
                    <RiLogoutCircleRLine />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <EditProfile isOpen={modalOpen} onRequestClose={toggleModal} />
    </div>
  );
};

export default Navbar;
