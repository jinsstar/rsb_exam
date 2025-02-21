import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../views/Login";
import PrivateRoute from "../components/PrivateRoute";
import Offices from "../views/admin/Offices";
import AddUser from "../views/admin/AddUser";
import UserDashboard from "../views/user/UserDashboard";
import NotFound from "../views/NotFound";
import Users from "../views/admin/Users";
import ForgotPassword from "../views/forgotpassword/ForgotPassword";
import Register from "../views/Register";
import AddTask from "../views/task/AddTask";

function DefineRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} /> 

                {/* ADMIN */}
                <Route 
                    path="/admin" 
                    element={
                        <PrivateRoute allowedRoles={["Admin"]}>
                            <Users />
                        </PrivateRoute>
                    } 
                />
                <Route 
                    path="/admin/users" 
                    element={
                        <PrivateRoute allowedRoles={["Admin"]}>
                            <Users />
                        </PrivateRoute>
                    } 
                />
                <Route 
                    path="/admin/task" 
                    element={
                        <PrivateRoute allowedRoles={["Admin"]}>
                            <Offices />
                        </PrivateRoute>
                    } 
                />
                <Route 
                    path="/admin/adduser" 
                    element={
                        <PrivateRoute allowedRoles={["Admin"]}>
                            <AddUser />
                        </PrivateRoute>
                    } 
                />
                

                {/* --------------------------------------------------------------------------------- */}
                {/* STUDENT ROUTING */}
                <Route 
                    path="/user" 
                    element={
                        <PrivateRoute allowedRoles={["user"]}>
                            <UserDashboard />
                        </PrivateRoute>
                    } 
                />
               
                <Route 
                    path="/user/dashboard" 
                    element={
                        <PrivateRoute allowedRoles={["user"]}>
                            <UserDashboard />
                        </PrivateRoute>
                    } 
                />
               
                 <Route 
                    path="/student/add-task" 
                    element={
                        <PrivateRoute allowedRoles={["user"]}>
                            <AddTask />
                        </PrivateRoute>
                    } 
                />

                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}

export default DefineRoutes;
