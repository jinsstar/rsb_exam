import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, allowedRoles }) => {
    const role = localStorage.getItem("role");
    if (!role || !allowedRoles.includes(role)) {
        return <Navigate to="/" />;
    }
    return children;
};

export default PrivateRoute;
