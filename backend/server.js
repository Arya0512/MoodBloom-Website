
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const app = express();
const authRoutes = require("./routes/authRoute");
const actRoutes = require("./routes/act");
const userProfile = require("./routes/profileRoute");
const Act = require("./models/kindnessAct");
const PORT = process.env.PORT || 5000;
const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};


app.use(cors(corsOptions));
app.use(express.json());



// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/acts", actRoutes);
app.use("/api/user", userProfile);


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('database Connected'))
  .catch((err)=>console.error(err));

app.get("/", (req, res) => {
  res.send("working");
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
