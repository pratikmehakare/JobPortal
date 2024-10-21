import React, { useState } from "react";
import logo from "../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { getInitials } from "../helper/utils";
import { useNavigate } from "react-router-dom";
import { clearUser } from "../redux/userSlice";

const Navbar2 = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const user = useSelector((state) => state.user);
  const initials = getInitials(user.name);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  
  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(clearUser());
    navigate("/");
  };


  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="fixed top-0 left-0 p-6 flex items-center justify-between w-full bg-white shadow-md z-10">
      <div className="flex items-center">
        <img src={logo} alt="Cuvette logo" className="h-10 ml-8" />
      </div>
      <div className="flex items-center space-x-4 mr-8">
        <span className="text-gray-500 text-xl">Contact</span>
        <div className="relative">
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={toggleDropdown} // Toggle dropdown on click
          >
            <div className="w-8 h-8 flex items-center justify-center bg-gray-400 rounded-full">
              {initials}
            </div>
            <span className="text-gray-500">{user.name}</span>
            <i className="fas fa-caret-down text-gray-500"></i>
          </div>

          {/* Dropdown */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg">
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar2;