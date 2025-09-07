const express = require("express");
const KindnessAct = require("../models/kindnessAct");
const verifytoken=require("../middleware/authMiddleware")
const User=require("../models/userModel");
const router = express.Router();

router.get("/mood", verifytoken, async (req, res) => {
  const { mood } = req.query;
  const acts = await KindnessAct.find({ mood });

  if (!acts.length) return res.status(404).json({ message: "No acts found" });

  const randomAct = acts[Math.floor(Math.random() * acts.length)];

 
  const user = await User.findById(req.user.id);
  if (randomAct && !user.tasks.some(t => t.toString() === randomAct._id.toString())) {
  user.tasks.push(randomAct._id);
  await user.save();
}

  res.json(randomAct);
});
router.post("/add-task", verifytoken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const { actId } = req.body;

  
    if (!user.tasks.some(t => t.toString() === actId.toString())) {
      user.tasks.push(actId);
      await user.save();
    }

    res.json({ message: "Task added", tasks: user.tasks });
  } catch (err) {
    res.status(500).json({ message: "Failed to add task", error: err.message });
  }
});



module.exports = router;
