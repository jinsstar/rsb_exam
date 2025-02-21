import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaAngleDown, FaRegUserCircle } from "react-icons/fa";
import { ImUsers } from "react-icons/im";
import { FaClipboardUser } from "react-icons/fa6";
import { GrStatusUnknown } from "react-icons/gr";
import { RiImportLine } from "react-icons/ri";
import { MdManageAccounts } from "react-icons/md";
import { RiLogoutBoxFill } from "react-icons/ri";

const AdminHeader = () => {
    const [userName, setUserName] = useState("");
    const [isStudentMenuOpen, setIsStudentMenuOpen] = useState(false);
    const [isMangeMenuOpen, setIsManageMenuOpen] = useState(false);
    const [isOfficesMenuOpen, setIsOfficesMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation(); // Get the current route

    useEffect(() => {
        const storedName = localStorage.getItem("userName");
        if (storedName) setUserName(storedName);
    }, []);

    const onLogout = async () => {
        const confirmLogout = window.confirm("Are you sure you want to log out?");
        if (!confirmLogout) return;

        try {
            localStorage.clear();
            sessionStorage.clear();
            navigate("/", { replace: true });
            alert("You have been successfully logged out.");
        } catch (error) {
            console.error("Error during logout:", error);
            alert("An error occurred while logging out. Please try again.");
        }
    };

    // Function to check if the current route matches
    const isActive = (path) => location.pathname === path;

    const toggleStudentMenu = () => {
        setIsStudentMenuOpen((prev) => !prev);
    };
    const toggleManageMenu = () => {
        setIsManageMenuOpen((prev) => !prev);
    };

    return (
        <div className="flex">
            <div className="w-64 h-screen bg-white text-slate-700 p-5 border-slate-200 border border-1">
                <p className="text-2xl font-bold px-4">Admin Panel</p>
                <div className="mt-2 text-lg px-4">
                    {userName ? userName : "Profile"}
                </div>
                <div className="w-full h-full mt-8">
                    <Link
                        to="/admin/users"
                        className={`py-2 px-4 rounded flex items-center gap-2 transition duration-200 ${
                            isActive("/admin/users") ? "bg-gray-700 text-white" : "hover:bg-gray-700 hover:text-white"
                        }`}
                    >
                        <ImUsers size={30} />
                        Users
                    </Link>
                    <Link
                        to="/admin/profile"
                        className={` py-2 px-4 rounded flex items-center transition gap-2 duration-200 ${
                            isActive("/admin/profile") ? "bg-gray-700 text-white" : "hover:bg-gray-700 hover:text-white"
                        }`}
                    >
                        <FaRegUserCircle size={30} />
                        Add Task
                    </Link>

                    <button
                        className="w-full text-left flex items-center px-4 gap-2 py-2 hover:bg-gray-200"
                        onClick={onLogout}
                    >
                        <RiLogoutBoxFill size={30} />
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminHeader;
