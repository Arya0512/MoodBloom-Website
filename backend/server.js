
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const app = express();
const authRoutes = require("./routes/authRoute");
const actRoutes = require("./routes/act");
const userProfile = require("./routes/profileRoute");


const corsOptions = {
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/Act')
  .then(() => console.log('database Connected'))
  .catch((err)=>console.error(err));

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/acts", actRoutes);
app.use("/api/user", userProfile);

app.get("/", (req, res) => {
  res.send("working");
});

// ✅ Start server AFTER DB connects
app.listen(5000, () => {
  console.log("server is running on port 5000");
});
