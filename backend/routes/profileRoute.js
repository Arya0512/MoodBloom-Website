const express = require("express");
const User = require("../models/userModel");
const verifyToken=require("../middleware/authMiddleware");
const kindnessAct=require("../models/kindnessAct");
const router=express.Router();


router.get("/profile", verifyToken, async (req, res) => {
  try {
    console.log("Decoded user:", req.user);

    const user = await User.findById(req.user.id)
      .populate({
        path: "tasks",
        match: { _id: { $ne: null } } // ignore nulls
      })
      .populate("completedTasks.task");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    console.error("Profile fetch error:", err); // 👈 log the real issue
    res.status(500).json({ error: err.message });
  }
});





router.post("/complete-task/:taskId", verifyToken, async (req, res) => {
  try {
    const { taskId } = req.params;
    const user = await User.findById(req.user.id)
      .populate("tasks")
      .populate("completedTasks.task");

  
    if (!user.tasks.some(t => t._id.toString() === taskId)) {
      return res.status(400).json({ message: "Task not found in user’s list" });
    }

    // Move task to completed
    user.completedTasks.push({ task: taskId, date: new Date() });
    user.tasks = user.tasks.filter(t => t._id.toString() !== taskId);

    // ---- UTC day comparison (DST-proof) ----
    const toUTCMidnight = (d) =>
      new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));

    const todayUTC = toUTCMidnight(new Date());

    if (user.lastCompletedDate) {
      const lastUTC = toUTCMidnight(new Date(user.lastCompletedDate));
      const daysDiff = Math.round((todayUTC - lastUTC) / 86400000); 

      if (daysDiff === 0) {
      
      } else if (daysDiff === 1) {
        user.streak += 1; // continue streak
      } else {
        user.streak = 1;  // reset streak
      }
    } else {
      user.streak = 1;  
    }

    
    user.lastCompletedDate = todayUTC;

    await user.save();
    res.json({
      message: "Task completed",
      completedTasks: user.completedTasks,
      streak: user.streak,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/completed-task/:taskId", verifyToken, async (req, res) => {
  try {
    const { taskId } = req.params;
    const user = await User.findById(req.user.id);

    user.completedTasks = user.completedTasks.filter(
      (ct) => ct._id.toString() !== taskId
    );

    await user.save();

    res.json({
      message: "Completed task deleted",
      completedTasks: user.completedTasks,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;



