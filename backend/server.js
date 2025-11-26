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

app.use(cors());
app.use(express.json());

// ===== CORS Setup =====
/*const allowedOrigins = [
  "http://localhost:5173",
  "https://moodbloom-project-git-main-arya-waskars-projects.vercel.app",
  "https://moodbloom-project-esjohygje-arya-waskars-projects.vercel.app",
];

app.use(cors({
  origin: function (origin, callback) {
    // allow server-to-server requests like Postman
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, origin);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // allow cookies/auth headers
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
}));

// Preflight handling
app.options("*", cors({
  origin: allowedOrigins,
  credentials: true
}));*/


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
