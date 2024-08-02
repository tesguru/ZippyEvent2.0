import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.loginProfile);

  if (isAuthenticated && isAuthenticated["status_code"] !== "0") {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;
