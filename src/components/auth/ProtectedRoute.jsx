// src/components/auth/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { storageKeys } from "@/lib/storageKeys";

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth) || {};
  const token = localStorage.getItem(storageKeys.authToken);

  if (!user?.id || !token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
