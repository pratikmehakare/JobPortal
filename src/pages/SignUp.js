import React from 'react';
import { FaUser, FaPhone, FaBuilding, FaEnvelope, FaUsers } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Navbar from '../components/Navbar';
import toast from 'react-hot-toast';

const SignUp = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    console.log(data); // Log the form data (you can send this to your backend)
    
    try {
      console.log(process.env.REACT_APP_API_BASE_URL)
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/v1/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: data.email }), // Sending the email to the API
      });

      const result = await response.json();
      if (response.ok) {
        // console.log('OTP sent successfully:', result);
       
        navigate('/validate', { state: data }); // Redirect after successful submission
        toast.success("OTP sent successfully")
      } else {
        console.error('Error sending OTP:', result.message);
        alert('Failed to send OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while sending OTP. Please try again.');
    }
  };

  return (
    <div className="bg-white flex items-center justify-center min-h-screen">
      <Navbar /> {/* Use the Navbar component */}
      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-6xl mx-auto p-6">
        <div className="md:w-1/2 p-6">
          <p className="text-gray-500 text-lg">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley.
          </p>
        </div>
        <div className="md:w-1/2 p-6">
          <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-8">
            <h2 className="text-2xl text-center font-bold mb-2">Sign Up</h2>
            <p className="text-gray-500 text-center mb-6">Lorem Ipsum is simply dummy text</p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <div className="relative">
                  <FaUser className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Name"
                    {...register('name', { required: true })}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.name && <p className="text-red-500 text-sm">Name is required</p>}
                </div>
              </div>
              <div className="mb-4">
                <div className="relative">
                  <FaPhone className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Phone no."
                    {...register('phone', { required: true, pattern: /^[0-9]{10}$/ })} // Regex for 10 digits
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.phone && <p className="text-red-500 text-sm">Valid phone number is required</p>}
                </div>
              </div>
              <div className="mb-4">
                <div className="relative">
                  <FaBuilding className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Company Name"
                    {...register('companyName', { required: true })}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.companyName && <p className="text-red-500 text-sm">Company name is required</p>}
                </div>
              </div>
              <div className="mb-4">
                <div className="relative">
                  <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="email"
                    placeholder="Company Email"
                    {...register('email', { required: true, pattern: /^\S+@\S+$/i })} // Regex for email
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.email && <p className="text-red-500 text-sm">Valid email is required</p>}
                </div>
              </div>
              <div className="mb-4">
                <div className="relative">
                  <FaUsers className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Employee Size"
                    {...register('employeeSize', { required: true, pattern: /^[0-9]+$/ })} // Regex for number
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.employeeSize && <p className="text-red-500 text-sm">Employee size is required</p>}
                </div>
              </div>
              <div className="text-center text-gray-500 text-sm mb-4">
                By clicking on proceed you will accept our{' '}
                <a href="#" className="text-blue-500">
                  Terms & Conditions
                </a>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Proceed
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
