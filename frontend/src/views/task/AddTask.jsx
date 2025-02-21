import React, { useState, useEffect } from 'react';
import StudentHeader from '../../components/header/student/Userheader';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const AddTask = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    user_id: null
  });
  
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    appendUserId(localStorage.getItem("id"));
  }, []);

  const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (!formData.name) {
        setError('This field is required.');
        return;
      }
      
      setLoading(true);
      const token = localStorage.getItem('token');
      try {
          const response = await axios.post('http://localhost:8000/api/addTask', {
              ...formData
          },
          {
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
              }
          }

      );
      navigate("/user/dashboard", { replace: true });
      } catch (err) {
          const errorMessage = err.response?.data?.message || 'A network error occurred';
          setError(errorMessage);
          setMessage('');
      } finally {
          setLoading(false);
      }
    };

    const appendUserId = (id) => {
      setFormData((prevData) => ({
        ...prevData,
        user_id: id, // Append user ID
      }));
    };
    const handleChange = (e) => {
      const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
    };

    const clearForm = () => {
      setMessage(response.data.message);
      setError('');
      setTimeout(() => {
          setMessage('');
      }, 5000);
      setFormData({
          name: '',
          description: '',
        });
    }

    return (
      <div className="w-full h-screen flex overflow-hidden">
        <StudentHeader />
        {message && (
          <div className="fixed top-0 w-full bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded flex items-center justify-between z-50">
            <span>{message}</span>
            <button onClick={handleDismiss} className="text-green-700 font-bold hover:text-green-900">
              ×
            </button>
          </div>
        )}
        {error && (
          <div className="fixed top-0 w-full bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded flex items-center justify-between z-50">
            <span>{error}</span>
            <button onClick={() => setError('')} className="text-red-700 font-bold hover:text-red-900">
              ×
            </button>
          </div>
        )}
  
        <div className="w-full h-screen flex justify-center items-center">
          <form onSubmit={handleSubmit} className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
            <div className="flex flex-col gap-5 w-full">
              <p className="font-semibold text-lg text-center">Add New Task</p>
              <input
                type="text"
                className="w-full h-10 outline-1 outline outline-slate-300 rounded-lg p-2"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Task Name"
                required
              />
              <input
                type="text"
                className="w-full h-10 outline-1 outline outline-slate-300 rounded-lg p-2"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                required
              />
              <button
                type="submit"
                className="bg-yellow-300 h-10 rounded-lg text-black hover:text-white font-semibold hover:bg-blue-500 w-full"
                disabled={loading}
              >
                {loading ? 'Adding...' : 'Add Task'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
}
export default AddTask;