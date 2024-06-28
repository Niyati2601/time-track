import React from "react";
import { useSelector } from "react-redux";

const Navbar = () => {

  const user=useSelector((state)=>state.user)

  return (
    <div className="p-2">
      <div className="py-3 px-3 w-full bg-white shadow-md">
        <div className="flex justify-between items-center">
          <div className="flex justify-items-center items-center gap-2 text-xl ">
            Dashboard
          </div>
          <div className="flex justify-items-center items-center gap-2 ">
            {user && <img
              className="inline-block w-8 h-8 rounded-full ring-2 ring-white"
              src={user?.user?.profilePhoto || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"} 
              alt=""
            />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
