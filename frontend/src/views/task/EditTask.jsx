import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const EditTask = ({ data, onClose, onSave }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: data.name,
        description: data.description
    });

    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
 // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
          setFormData({
            ...formData,
            [name]: value,
          });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name) {
            setError('This field is required.');
            return;
        }
    
        const token = localStorage.getItem('token');
        try {
            const response = await axios.put(`http://localhost:8000/api/updateTask/${data.id}`, {
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
            debugger
        }
    };

    return (
        <div style={modalStyle}>
        <div style={modalContentStyle}>
            <h2>Edit Data</h2>
            <form onSubmit={handleSubmit}>
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
            <button type="submit" style={saveButtonStyle}>Save</button>
            <button onClick={onClose} style={closeButtonStyle}>Close</button>
            </form>
        </div>
        </div>
    );
  };

// Styling for the modal and its content
const modalStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };
  
  const modalContentStyle = {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '5px',
    width: '300px',
  };
  
  const inputStyle = {
    width: '100%',
    padding: '8px',
    margin: '10px 0',
    borderRadius: '4px',
    border: '1px solid #ccc',
  };
  
  const closeButtonStyle = {
    backgroundColor: '#f44336',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    width: "50%"
  };
  const saveButtonStyle = {
    backgroundColor: "rgb(59 130 246 / var(--tw-bg-opacity, 1))",
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    width: "50%"
  };
  
  export default EditTask;