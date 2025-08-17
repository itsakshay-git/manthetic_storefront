import React from "react";
import userImage from "../../../assets/images/userImage.png";
import { logout } from "@/redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProfileCard = ({ user }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };
  return (
    <div className="relative bg-white rounded-xl p-6 flex flex-col items-center">
      <button
        onClick={handleLogout}
        className="absolute top-4 right-4 px-4 py-1 bg-black text-white rounded-full cursor-pointer hover:bg-gray-800 transition"
      >
        Sign Out
      </button>
      <div className="w-24 h-24 rounded-full bg-gray-300 mb-4">
        <img src={userImage} alt={user?.name} className="rounded-full" />
      </div>
      <p className="font-semibold text-lg">{user?.name || "Akshay Dhongade"}</p>
      <p className="text-gray-500">{user?.email || "akshay@gmail.com"}</p>
    </div>
  );
};

export default ProfileCard;
