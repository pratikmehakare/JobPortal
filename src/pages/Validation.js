import React, { useState, useEffect } from 'react';
import { FaEnvelope, FaMobileAlt, FaCheckCircle } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { useDispatch ,useSelector} from "react-redux";
import { setUser } from "../redux/userSlice";
import {getUser} from "../services/oprations/getUser"

const Validation = () => {
  const user = useSelector((state) => state.user);
  const location = useLocation();
  const dispatch = useDispatch();
  const { state } = location;
  const [emailOtp, setEmailOtp] = useState('');
  const [mobileOtp, setMobileOtp] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isMobileVerified, setIsMobileVerified] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [registrationResponse, setRegistrationResponse] = useState('');
  const navigate = useNavigate();

  const handleEmailOtpChange = (e) => {
    setEmailOtp(e.target.value);
  };

  const handleMobileOtpChange = (e) => {
    setMobileOtp(e.target.value);
  };


  const fetchUser = async () => {
    if (localStorage.getItem("token")) {
      const userData = await getUser();
      if (userData) {
        dispatch(setUser(userData.data)); // Store user data in Redux
        console.log("userdata",userData.data)
        console.log("user",user)
      }
    }
  };

  const handleEmailVerify = async () => {
    try {
      console.log(process.env.REACT_APP_API_BASE_URL)
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/v1/verify`, {
        email: state.email,
        otp: emailOtp,
      });

      if (response.status === 200) {
        setIsEmailVerified(true);
        setErrorMessage('');

        const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/v1/register`, {
          name: state.name,
          phone: state.phone,
          company: state.companyName,
          email: state.email,
          employeesize: state.employeeSize,
        });

        // setRegistrationResponse(registrationResponse.data.message);
        localStorage.setItem('token',res.data.token);
  
        // Store user details in Redux
        // dispatch(setUser(registrationResponse.data.user)); // Assuming the user object is in the response
        fetchUser();
      }
    } catch (error) {
      setErrorMessage('Invalid OTP. Please try again.');
      console.error('Error verifying email OTP:', error);
    }
  };

  const handleMobileVerify = () => {
    setIsMobileVerified(true);
  };

  useEffect(() => {
    if (isEmailVerified && isMobileVerified) {
      navigate('/dashboard');
    }
  }, [isEmailVerified, isMobileVerified, navigate]);

  return (
    <div className="bg-white flex items-center justify-center min-h-screen">
      <Navbar />
      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-6xl mx-auto p-6">
        <div className="md:w-1/2 p-6">
          <p className="text-gray-500 text-lg">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          </p>
        </div>
        <div className="md:w-1/2 p-6">
          <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-2">Verification</h2>
            <p className="text-gray-500 mb-6">Verify your account using the OTP sent to your email and mobile.</p>

            <div className="mb-4">
              <div className="flex items-center border border-gray-300 rounded-lg p-2 mb-2">
                <FaEnvelope className="text-gray-500 mr-2" />
                <input
                  type="text"
                  placeholder="Enter Email OTP"
                  value={emailOtp}
                  onChange={handleEmailOtpChange}
                  className="outline-none flex-1 text-gray-500"
                  disabled={isEmailVerified}
                />
                {isEmailVerified && (
                  <FaCheckCircle className="text-green-500 ml-2" />
                )}
              </div>
              {!isEmailVerified && (
                <button
                  onClick={handleEmailVerify}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                  Verify Email
                </button>
              )}
            </div>
            <div>
              <div className="flex items-center border border-gray-300 rounded-lg p-2 mb-2">
                <FaMobileAlt className="text-gray-500 mr-2" />
                <input
                  type="text"
                  placeholder="Enter Mobile OTP"
                  value={mobileOtp}
                  onChange={handleMobileOtpChange}
                  className="outline-none flex-1 text-gray-500"
                  disabled={isMobileVerified}
                />
                {isMobileVerified && (
                  <FaCheckCircle className="text-green-500 ml-2" />
                )}
              </div>
              {!isMobileVerified && (
                <button
                  onClick={handleMobileVerify}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                  Verify Mobile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Validation;
