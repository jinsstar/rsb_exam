import React, { useState, useEffect } from 'react';
import StudentHeader from '../../components/header/student/Userheader';
import EditTask from '/src/views/task/EditTask';
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import axios from 'axios';

const UserDashboard = () => {
  const [task, setTask] = useState([]);
  const [editData, setEditData] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [userID, setUserId] = useState(localStorage.getItem('id'));
  
    // Fetch courses data from the API on component mount
    useEffect(() => {
      fetchTask();
    }, []);
    
    const fetchTask = async () => {
      try {
           const response = await axios.get(`http://localhost:8000/api/getTask/${userID}`,
           {
               headers: {
                 'Authorization': `Bearer ${token}`,
                 'Content-Type': 'application/json',
               }
           }
         );
         setTask(response.data.data)
       } catch (err) {
           // const errorMessage = err.response?.data?.message || 'A network error occurred';
           // setError(errorMessage);
           // setMessage('');
       } finally {
       }
   };

   

    // Handler for showing the popup
    const openPopup = (data) => {
      setEditData(data);
      setShowPopup(true);
    };

    // Handler for closing the popup
    const closePopup = () => {
      debugger
      setShowPopup(false);
    };

    // Handler for saving the edited data
    const saveData = (newData) => {
      closePopup(); // Close the popup
    };

    // Handle Delete Office with confirmation
    const handleDeleteTask = async (id) => {
      debugger
      const isConfirmed = window.confirm("Are you sure you want to delete this Task?");
        if (isConfirmed) {
          try {
            const response = await axios.delete(`http://localhost:8000/api/deleteTask/${id}`,
            {
              headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json',
                }
              }
            );
            debugger
            
        } catch (err) {
            // const errorMessage = err.response?.data?.message || 'A network error occurred';
            // setError(errorMessage);
            // setMessage('');
        } finally {
          fetchTask();
        }
      } else {
        alert('Office deletion canceled.');  // User canceled the deletion
      }
    };

  return (
    <div className='w-full h-full flex overflow-hidden'>
      <StudentHeader />
      <div className="users-container w-full flex flex-col">
          <p className="flex justify-center mt-7 font-semibold">Task List</p>
          <div className="w-full flex">
            
            {/* ADD USERS */}
            <div className="relative group w-32 flex justify-end items-center">
              <Link to="/student/add-task">
                <FaPlus
                  size={40}
                  color="white"
                  className="mr-7 hover:bg-blue-500 rounded-3xl p-1 bg-[#E4CF3D]"
                />
              </Link>
              <span className="absolute bottom-full mr-8 -mb-4 hidden group-hover:flex items-center bg-gray-800 text-white text-sm rounded-md p-2">
                Add Task
              </span>
            </div>
          </div>
                            {/* Table Section */}
                            <div className="w-full h-screen p-4 overflow-x-auto">
            <table className="table-fixed w-[100%] text-left">
              <thead>
                <tr className="bg-slate-200">
                  <th className="users-th p-6">#</th>
                  <th className="users-th">Task</th>
                  <th className="users-th">
                    <p className="flex justify-center">Description</p>
                  </th>
                  <th className="users-th">
                    <p className="flex justify-center">Action</p>
                  </th>
                </tr>
              </thead>
              {/* Scrollable Table Body */}
              <tbody className="">
                {task?.length > 0 ? (
                  task.map((taskdata, index) => (
                    <tr key={taskdata.id} className="border-b">
                      <td className="users-td pt-6 pl-6">{index + 1}</td>
                      <td className="users-td pt-6 text-sm">{taskdata.name}</td>
                      <td className="users-td pt-6">
                        <p className="flex justify-center text-sm">{taskdata.description}</p>
                      </td>
                      <td style={{textAlign: "center"}}>
                          <button
                            onClick={() => openPopup(taskdata)}
                            className="bg-blue-500 text-white p-1">
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteTask(taskdata.id)}
                            className="bg-red-500 text-white p-1">
                            Delete
                          </button>
                        </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center p-6 text-gray-500">
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        {showPopup && <EditTask data={editData} onClose={closePopup} onSave={saveData} />}
    </div>
  );
}

export default UserDashboard;
