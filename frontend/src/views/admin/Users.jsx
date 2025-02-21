import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminHeader from "../../components/header/admin/AdminHeader";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch users from the backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/users", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token if required
          },
        });
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Filter users based on search query
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
    <div className="w-full h-full">
      <div className="w-full h-screen flex overflow-hidden">
        {/* <AdminHeader /> */}
        <AdminHeader />
        <div className="users-container w-full flex flex-col">
          <p className="flex justify-center mt-7 font-semibold">Users Registered</p>
          <div className="w-full flex">
            <div className="flex justify-start p-4 gap-5 w-full">
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="p-2 border border-gray-300 rounded-lg w-1/2"
              />
            </div>
            {/* ADD USERS */}
            <div className="relative group w-32 flex justify-end items-center">
              <Link to="/admin/adduser">
                <FaPlus
                  size={40}
                  color="white"
                  className="mr-7 hover:bg-blue-500 rounded-3xl p-1 bg-[#E4CF3D]"
                />
              </Link>
              <span className="absolute bottom-full mr-8 -mb-4 hidden group-hover:flex items-center bg-gray-800 text-white text-sm rounded-md p-2">
                Add user
              </span>
            </div>
          </div>

          {/* Table Section */}
          <div className="w-full h-screen p-4 overflow-x-auto">
            <table className="table-fixed w-[100%] text-left">
              <thead>
                <tr className="bg-slate-200">
                  <th className="users-th p-6">#</th>
                  <th className="users-th">Name</th>
                  <th className="users-th">
                    <p className="flex justify-center">Email</p>
                  </th>
                  <th className="users-th">
                    <p className="flex justify-center">Role</p>
                  </th>
                </tr>
              </thead>
              {/* Scrollable Table Body */}
              <tbody className="">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user, index) => (
                    <tr key={user.id} className="border-b">
                      <td className="users-td pt-6 pl-6">{index + 1}</td>
                      <td className="users-td pt-6 text-sm">{user.name}</td>
                      <td className="users-td pt-6 text-sm">
                        <p className="flex justify-center text-sm">{user.email}</p>
                      </td>
                      <td className="users-td pt-6">
                        <p className="flex justify-center text-sm">{user.role}</p>
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
      </div>
    </div>
    </>
  );
};

export default Users;
