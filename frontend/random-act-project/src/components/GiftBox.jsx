import React, { useState } from "react";
import axios from "axios";

const GiftBox = ({ act }) => {
  const [opened, setOpened] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login first");
        return;
      }
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/acts/add-task`,
        { actId: act._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.status === 200) {
        setSaved(true);
      }
    } catch (err) {
      console.error("❌ Error saving act:", err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-yellow-100 p-6">
      {!opened ? (
        <div
          className="relative w-48 h-48 cursor-pointer animate-bounce hover:scale-110 transition-transform duration-300"
          onClick={() => setOpened(true)}
        >
          {/* 🎁 Box Base */}
          <div className="absolute w-full h-full bg-pink-500 rounded-lg shadow-2xl border-4 border-pink-300">
            <div className="absolute top-0 left-1/2 w-3 h-full bg-yellow-300 transform -translate-x-1/2"></div>
            <div className="absolute top-1/2 left-0 w-full h-3 bg-yellow-300 transform -translate-y-1/2"></div>
          </div>

          {/* 🎁 Lid */}
          <div className="absolute top-0 left-0 w-full h-16 bg-pink-600 rounded-t-lg shadow-lg transform transition-transform duration-500 hover:-translate-y-2"></div>

          {/* ✨ Glow effect */}
          <div className="absolute inset-0 rounded-lg bg-pink-400 opacity-40 blur-lg animate-pulse"></div>
        </div>
      ) : (
        <div className="mt-6 p-8 bg-white rounded-2xl shadow-2xl text-center max-w-md animate-fade-in border border-pink-200">
          <h2 className="text-3xl font-extrabold text-pink-600 mb-4 animate-bounce">
            🎉 Your Kindness Act
          </h2>
          <p className="mt-3 text-gray-700 text-lg leading-relaxed italic">
            {act.text || "No act available"}
          </p>

          {!saved ? (
            <button
              onClick={handleSave}
              className="mt-6 px-6 py-3 bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold rounded-full shadow-lg hover:scale-105 transition-transform"
            >
              💖 Save to My Profile
            </button>
          ) : (
            <p className="mt-6 text-green-600 font-semibold text-lg animate-pulse">
              ✅ Saved Successfully!
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default GiftBox;

