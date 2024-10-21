import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'

const Navbar = () => {
  return (
    <div className="absolute top-0 left-0 p-6 flex items-center justify-between w-full">
      <div className="flex items-center">
        <img
          src={logo}
          alt="Cuvette logo"
          className="h-10 ml-8"
          
        />
      </div>
      <div>
        <Link to="/contact" className="text-gray-500 mr-8 text-xl">
          Contact
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
