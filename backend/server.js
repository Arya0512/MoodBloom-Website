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

// ===== CORS Setup =====


const corsOptions = {
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true, 
};

// Enable CORS for all routes
app.use(cors(corsOptions));
// Preflight handling
app.options("*", cors(corsOptions));
// ===== Middleware =====
app.use(express.json());

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
  console.log(` Server running on port ${PORT}`);
});
