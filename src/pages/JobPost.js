import React, { useState } from 'react';
import Navbar2 from '../components/Navbar2';
import logo from '../assets/Vector.png';
import {useSelector } from "react-redux";
import toast from 'react-hot-toast';

const JobPost = () => {
  const user = useSelector((state) => state.user);
  const [jobTitle, setJobTitle] = useState('');
  const [description, setDescription] = useState('');
  const [experience, setExperience] = useState('');
  const [endDate, setEndDate] = useState('');
  const [email, setEmail] = useState('');
  const [emails, setEmails] = useState([]);

  // Add email to the list when 'Enter' is pressed
  const handleAddEmail = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (email && !emails.includes(email)) {
        setEmails([...emails, email]);
        setEmail('');
      }
    }
  };

  // Remove email from the list
  const handleRemoveEmail = (emailToRemove) => {
    setEmails(emails.filter((email) => email !== emailToRemove));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const jobData = {
      company: user.company || "Cuvette",
      jobTitle,
      description,
      experience,
      endDate,
      emails,
    };

    try {
      console.log(process.env.REACT_APP_API_BASE_URL)
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/v1/jobpost`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobData),
      });

      if (response.ok) {
        const result = await response.json();
        toast.success("Job Post Send")
        // Reset form fields
        setJobTitle('');
        setDescription('');
        setExperience('');
        setEndDate('');
        setEmails([]);
      } else {
        toast.error('Failed to post the job. Please try again.');
      }
    } catch (error) {
      console.error('Error posting job:', error);
      toast.error('An error occurred while posting the job. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar2 />

      {/* Main content */}
      <div className="flex flex-1 pt-20">
        {/* Sidebar */}
        <aside className="w-16 bg-white shadow-md">
          <div className="flex justify-center py-4">
            <img src={logo} alt="Home logo" className="mt-5 h-8" />
          </div>
        </aside>

        {/* Form */}
        <main className="flex-1 p-8">
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto space-y-6">
            <div className="flex items-center space-x-4">
              <label className="w-40 text-gray-700">Job Title</label>
              <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="Enter Job Title"
                className="flex-1 border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="flex items-start space-x-4">
              <label className="w-40 text-gray-700">Job Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter Job Description"
                className="flex-1 border rounded px-4 py-2 h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              ></textarea>
            </div>
            <div className="flex items-center space-x-4">
              <label className="w-40 text-gray-700">Experience Level</label>
              <select
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="flex-1 border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Experience Level</option>
                <option>0-2 Years</option>
                <option>3-8 Years</option>
                <option>8+ Years</option>
              </select>
            </div>
            <div className="flex items-center space-x-4">
              <label className="w-40 text-gray-700">Add Candidate</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={handleAddEmail}
                placeholder="xyz@gmail.com"
                className="flex-1 border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Email Tags Section */}
            <div className="flex flex-wrap mt-2">
              {emails.map((email, index) => (
                <div key={index} className="flex items-center bg-blue-100 text-blue-800 rounded-full px-3 py-1 mr-2 mb-2">
                  <span>{email}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveEmail(email)}
                    className="ml-2 text-blue-600 hover:text-blue-800"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <label className="w-40 text-gray-700">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="flex-1 border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
              >
                Send
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default JobPost;
