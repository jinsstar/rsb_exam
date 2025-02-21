// src/components/SampleSideBar.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom"; // Import useLocation

const AccountingClerk = () => {
    const [userName, setUserName] = useState(""); // Store the user's name
    const navigate = useNavigate();
    const location = useLocation(); // Get the current location

    // Fetch user name on component mount
    useEffect(() => {
        const storedName = localStorage.getItem("userName");
        if (storedName) setUserName(storedName);
    }, []);
    
    // Logout handler
    const onLogout = async () => {
        const confirmLogout = window.confirm("Are you sure you want to log out?");
        if (!confirmLogout) return;

        try {
            // Clear all session-related data
            localStorage.clear(); // Clear all localStorage items
            sessionStorage.clear(); // Clear all sessionStorage items

            console.log("Successfully logged out");

            // Redirect to login page and prevent going back
            navigate("/", { replace: true });

            alert("You have been successfully logged out.");
        } catch (error) {
            console.error("Error during logout:", error);
            alert("An error occurred while logging out. Please try again.");
        }
    };

    return (
        <div className="flex">
            {/* Sidebar */}
            <div className="w-64 h-auto bg-white text-slate-700 p-5 border-slate-200 border border-1">
                <p className="text-2xl font-bold px-4">Accounting clerk Panel</p>
                <div className="mt-2 text-lg px-4">
                    {userName ? userName : "Profile"} {/* Display user's name or "Profile" as fallback */}
                </div>
                <div className="w-full h-full mt-8">
                    <Link
                        to="/accountingclerk/approved"
                        className={`block py-2 px-4 rounded transition duration-200 ${
                            location.pathname === "/adviser/approved"
                                ? "bg-gray-700 text-white"
                                : "hover:bg-gray-700 hover:text-white"
                        }`}
                    >
                        Approved
                    </Link>
                    <Link
                        to="/accountingclerk/student"
                        className={`block py-2 px-4 rounded transition duration-200 ${
                            location.pathname === "/adviser/student"
                                ? "bg-gray-700 text-white"
                                : "hover:bg-gray-700 hover:text-white"
                        }`}
                    >
                        Student
                    </Link>
                    <Link
                        to="/accountingclerk/profile"
                        className={`block py-2 px-4 rounded transition duration-200 ${
                            location.pathname === "/adviser/profile"
                                ? "bg-gray-700 text-white"
                                : "hover:bg-gray-700 hover:text-white"
                        }`}
                    >
                        Profile
                    </Link>
                    <button
                        className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                        onClick={onLogout}
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AccountingClerk;
