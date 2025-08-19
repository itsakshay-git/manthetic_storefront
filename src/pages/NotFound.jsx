// src/pages/NotFound.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
      <AlertTriangle className="w-16 h-16 text-red-500 mb-4" />
      <h1 className="text-4xl font-bold text-gray-800 mb-2">404 - Page Not Found</h1>
      <p className="text-gray-600 max-w-md mb-6">
        Oops! The page you’re looking for doesn’t exist or may have been moved.  
        Please check the URL or go back to the homepage.
      </p>
      <button
        onClick={() => navigate("/")}
        className="px-6 py-3 rounded-xl bg-black text-white font-medium hover:bg-gray-800 transition"
      >
        Back to Home
      </button>
    </div>
  );
};

export default NotFound;
