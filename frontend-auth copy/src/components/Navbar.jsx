import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../redux/userSlice";
import axios from "axios";
import BASE_URL from "../services/api";

const Navbar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/user/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="bg-gray-900 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Left: Nav */}
          <div className="flex items-center gap-4">
            <Link to="/" className="text-2xl font-extrabold tracking-tight text-indigo-400 hover:text-indigo-300 transition">
              MyApp
            </Link>
            <Link to="/home" className="text-sm sm:text-base hover:text-indigo-300">Home</Link>
            <Link to="/tasks" className="text-sm sm:text-base hover:text-indigo-300">Tasks</Link>
            <Link to="/dashboard" className="text-sm sm:text-base hover:text-indigo-300">Dashboard</Link>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-sm sm:text-base">
                  Welcome, <span className="font-semibold text-indigo-300">{user.user.firstname}</span>
                </span>

                <Link
                  to="/profile"
                  className="text-sm sm:text-base text-indigo-400 hover:text-indigo-300 transition"
                >
                  Profile
                </Link>

                <button
                  onClick={handleLogout}
                  className="px-3 py-1 sm:px-4 sm:py-2 text-sm sm:text-base bg-red-500 hover:bg-red-600 rounded-lg transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm sm:text-base text-indigo-400 hover:text-indigo-300 transition"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="text-sm sm:text-base text-indigo-400 hover:text-indigo-300 transition"
                >
                  Signup
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
