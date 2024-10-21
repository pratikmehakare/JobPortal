import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Navbar2 from "../components/Navbar2";
import logo from "../assets/Vector.png";
import {useSelector } from "react-redux";

const Dashboard = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate(); 

  const handleCreateInterview = () => {
    navigate("/jobpost"); 
  };


  useEffect(() => {
    console.log("user",user);
  }, []);
  

  return (
    <div className="flex flex-col h-screen">
      <Navbar2 />
      {/* Main section */}
      <div className="flex flex-1 pt-20">
        <aside className="w-20 bg-white shadow-md flex flex-col items-center py-4">
          <img src={logo} alt="Home logo" className="mt-5 h-8" />
        </aside>
        <main className="flex-1 p-8">
          <button
            onClick={handleCreateInterview} // Set onClick to handle function
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Create Interview
          </button>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
