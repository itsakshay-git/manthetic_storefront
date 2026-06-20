import React from "react";
import userImage from "../../../assets/images/userImage.png";
import { logout } from "@/redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LogOut, Mail, UserRound } from "lucide-react";

const ProfileCard = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <section className="overflow-hidden rounded-2xl border border-gray-200 bg-gray-950 text-white shadow-sm">
      <div className="grid grid-cols-1 gap-6 p-5 md:grid-cols-[1fr_auto] md:items-center md:p-7">
        <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
          <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full bg-white/10 ring-4 ring-white/10">
            <img src={userImage} alt={user?.name || "Profile"} className="h-full w-full object-cover" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-green-400">
              Welcome Back
            </p>
            <h2 className="mt-2 truncate text-2xl font-bold md:text-3xl">
              {user?.name || "Manthetic Customer"}
            </h2>
            <div className="mt-3 flex flex-col gap-2 text-sm text-white/70 sm:flex-row sm:items-center">
              <span className="inline-flex min-w-0 items-center justify-center gap-2 sm:justify-start">
                <Mail className="h-4 w-4 shrink-0 text-green-400" />
                <span className="truncate">{user?.email || "customer@manthetic.com"}</span>
              </span>
              <span className="hidden h-1 w-1 rounded-full bg-white/30 sm:block" />
              <span className="inline-flex items-center justify-center gap-2 sm:justify-start">
                <UserRound className="h-4 w-4 shrink-0 text-green-400" />
                Member account
              </span>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white px-5 py-2.5 text-sm font-medium text-gray-950 transition hover:bg-green-500 hover:text-white md:w-auto"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>
    </section>
  );
};

export default ProfileCard;
