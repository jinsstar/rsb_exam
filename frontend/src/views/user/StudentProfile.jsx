import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StudentHeader from '../../components/header/student/Userheader';
import Bpclogo from "../../assets/bpclogo.png";

const StudentProfile = () => {
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    password: '',  // Password is not fetched
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  // Fetch user data when the component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8000/api/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserInfo({
          name: response.data.name,
          email: response.data.email,
          password: '',  // Do not show password from the response
        });
      } catch (err) {
        setError('Failed to fetch user data');
      }
    };
    fetchUserData();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        'http://localhost:8000/api/profile',
        userInfo,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert('Profile updated successfully');
    } catch (err) {
      if (err.response && err.response.data.message) {
        setError(err.response.data.message); // Display the error message from backend
      } else {
        setError('Failed to update profile');
      }
    } finally {
      setLoading(false);
    }
  };
  

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='w-full h-full flex overflow-hidden'>
      <StudentHeader />
      <div className="w-full h-full flex flex-col">
        <div className="w-full h-screen flex flex-col gap-4 justify-center items-center">
          <img src={Bpclogo} className="w-24" alt="BPCL Logo" />
          <p className="text-lg font-semibold">Profile</p>
          {error && <p className="text-red-500">{error}</p>}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center">
            <input
              type="email"
              name="email"
              value={userInfo.email}
              onChange={handleChange}
              className="h-10 outline outline-1 outline-slate-300 rounded-lg p-2 w-64"
              placeholder="Email"
            />
            <div className="relative w-64">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={userInfo.password}
                onChange={handleChange}
                className="h-10 outline outline-1 outline-slate-300 rounded-lg p-2 w-full"
                placeholder="New Password"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-2 top-2"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            <button
              type="submit"
              className="w-64 h-10 bg-blue-500 rounded-lg text-white hover:bg-yellow-400"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
