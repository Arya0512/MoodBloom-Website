// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Routes
const authRoutes = require("./routes/authRoute");
const actRoutes = require("./routes/act");
const userProfile = require("./routes/profileRoute");

// ===== Middleware =====
app.use(express.json());

// ===== CORS Setup =====
const allowedOrigins = [
  "http://localhost:5173",
  "https://moodbloom-act-website.onrender.com",
  "https://moodbloom-project-7w7pfr588-arya-waskars-projects.vercel.app",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // allow Postman or server-to-server requests
    if (allowedOrigins.includes(origin)) {
      callback(null, origin); // send origin explicitly for credentials
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // allow cookies/auth headers
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
};

// Apply CORS
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

// ===== Routes =====
app.use("/api/auth", authRoutes);
app.use("/api/acts", actRoutes);
app.use("/api/user", userProfile);

// ===== Root route =====
app.get("/", (req, res) => {
  res.send("MoodBloom backend is running!");
});

// ===== MongoDB Connection =====
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// ===== Start Server =====
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
