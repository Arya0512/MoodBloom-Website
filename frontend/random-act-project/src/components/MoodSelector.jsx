import React, { useState } from "react";
import GiftBox from "./GiftBox";
import Navbar from "./Navbar";

const MoodSelector = () => {
  const [mood, setMood] = useState("");
  const [act, setAct] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const handleMoodClick = async (selectedMood) => {
    setMood(selectedMood);

    const token = localStorage.getItem("token");
    try {
      const res = await fetch(
        `http://localhost:5000/api/acts/mood?mood=${selectedMood}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await res.json();

      if (data && data._id) {
        setAct(data);
      } else {
        setAct({ text: "No act available for this mood" });
      }
    } catch (err) {
      console.error(err);
      setAct({ text: "Could not fetch kindness act. Try again!" });
    }
  };

  return (
    <>
      <Navbar onLogout={handleLogout} />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-200 via-pink-100 to-yellow-100 p-6">
        {!mood ? (
          <>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-10 text-gray-800 text-center drop-shadow-lg">
              🌸 How are you feeling today? 🌸
            </h1>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-3xl">
              {[
                { mood: "happy", emoji: "😊", color: "from-yellow-300 to-yellow-400" },
                { mood: "sad", emoji: "😢", color: "from-blue-300 to-blue-400" },
                { mood: "angry", emoji: "😡", color: "from-red-300 to-red-400" },
                { mood: "stressed", emoji: "😓", color: "from-purple-300 to-purple-400" },
                { mood: "neutral", emoji: "😐", color: "from-gray-300 to-gray-400" },
              ].map(({ mood, emoji, color }) => (
                <button
                  key={mood}
                  onClick={() => handleMoodClick(mood)}
                  className={`flex flex-col items-center justify-center p-8 rounded-2xl shadow-xl bg-gradient-to-br ${color} hover:scale-110 transform transition duration-300 ease-out hover:shadow-2xl`}
                >
                  <span className="text-5xl mb-3">{emoji}</span>
                  <span className="text-lg font-bold capitalize">{mood}</span>
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="w-full max-w-md">
            <GiftBox act={act} />
          </div>
        )}
      </div>
    </>
  );
};

export default MoodSelector;

