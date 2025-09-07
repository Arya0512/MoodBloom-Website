import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ onLogout }) => {
  const navigate = useNavigate();

  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-gradient-to-r from-pink-400 via-purple-400 to-yellow-400 text-white shadow-lg ">
      {/* Logo / Brand */}
      <h1
        onClick={() => navigate("/home")}
        className="text-3xl font-extrabold tracking-wide cursor-pointer hover:scale-105 transition-transform duration-300 drop-shadow-lg"
      >
        MoodBloom 🌼
      </h1>

      {/* Right side actions */}
      <div className="flex items-center gap-6">
        {/* Home Button */}
        <button
          onClick={() => {
            navigate("/home");
            setTimeout(() => window.location.reload(), 50);
          }}
          className="px-4 py-2 rounded-lg bg-white text-pink-600 font-semibold shadow-md hover:bg-pink-100 hover:scale-105 transition duration-300"
        >
          🏠 Home
        </button>

        {/* Logout Button */}
        <button
          onClick={onLogout}
          className="px-4 py-2 rounded-lg bg-red-500 font-semibold shadow-md hover:bg-red-600 hover:scale-105 transition duration-300"
        >
          🚪 Logout
        </button>

        {/* Profile Icon */}
        <button
          onClick={() => navigate("/profile")}
          className="w-11 h-11 bg-white text-pink-600 rounded-full flex items-center justify-center font-bold shadow-md hover:scale-110 hover:bg-pink-100 transition duration-300"
        >
          👤
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
