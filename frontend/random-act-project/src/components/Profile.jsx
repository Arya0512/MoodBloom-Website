import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // Fetch user details
  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/user/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setUser(data);
    };
    fetchUser();
  }, [token]);
  const formatDate = (iso) =>
  new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
// e.g., "05 Sep 2025"

  const completeTask = async (taskId) => {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/user/complete-task/${taskId}`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await res.json();

    if (res.ok) {
      setUser((prev) => ({
        ...prev,
        tasks: prev.tasks.filter((t) => t._id !== taskId),
        completedTasks: data.completedTasks,
        streak: data.streak,
      }));
    } else {
      alert(data.message);
    }
  };
  const deleteCompletedTask = async (taskId) => {
  const res = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/user/completed-task/${taskId}`,
    {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  const data = await res.json();

  if (res.ok) {
    setUser((prev) => ({
      ...prev,
      completedTasks: data.completedTasks,
    }));
  } else {
    alert(data.message || "Failed to delete task");
  }
};


  if (!user) return <p className="text-center mt-10 text-lg">Loading...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl p-10 relative">
        {/* Profile Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-4xl font-bold text-gray-800">
              👤 {user.name}
            </h2>
            <p className="text-gray-500">Your kindness journey 🌱</p>
          </div>
          <button
            onClick={() => navigate("/home")}
            className="px-5 py-2 bg-indigo-500 text-white rounded-lg shadow hover:bg-indigo-600 transition"
          >
            ⬅ Back
          </button>
        </div>

        {/* Streak Section */}
        <div className="mb-10">
          <div className="bg-gradient-to-r from-orange-400 to-red-500 p-6 rounded-xl text-white shadow-lg">
            <h3 className="text-lg font-semibold">🔥 Streak</h3>
            <p className="text-4xl font-bold">{user.streak} days</p>

            {/* Progress Bar Example (Assume goal: 30 days) */}
            <div className="mt-3 bg-white/30 rounded-full h-3">
              <div
                className="bg-white h-3 rounded-full"
                style={{
                  width: `${Math.min((user.streak / 30) * 100, 100)}%`,
                }}
              ></div>
            </div>
            <p className="text-sm mt-1">Goal: 30-day kindness streak</p>
          </div>
        </div>

        {/* Current Tasks */}
        <div className="mb-10">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">
            🎯 Current Tasks
          </h3>
          {user.tasks.length === 0 ? (
            <p className="text-gray-500 italic">No active tasks.</p>
          ) : (
            <div className="grid gap-4">
              {user.tasks.map((task) => (
                <div
                  key={task._id}
                  className="flex justify-between items-center bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 p-4 rounded-lg shadow hover:shadow-md transition"
                >
                  <span className="text-gray-700 font-medium">{task.text}</span>
                  <button
                    onClick={() => completeTask(task._id)}
                    className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
                  >
                    ✅ Mark Done
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Completed Tasks */}
        <div>
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">
            ✅ Completed Tasks
          </h3>
          {user.completedTasks.length === 0 ? (
            <p className="text-gray-500 italic">No tasks completed yet.</p>
          ) : (
            <ul className="space-y-3">
  {user.completedTasks.map((ct) => (
    <li
      key={ct._id}
      className="bg-green-50 border border-green-200 p-4 rounded-lg shadow-sm flex justify-between items-center"
    >
      <div>
        <span className="text-gray-800 font-medium">{ct.task.text}</span>
        <p className="text-sm text-gray-500">{formatDate(ct.date)}</p>
      </div>
      <button
        onClick={() => deleteCompletedTask(ct._id)}
        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
      >
        🗑 Delete
        </button>
      </li>
        ))}
    </ul>
      )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
