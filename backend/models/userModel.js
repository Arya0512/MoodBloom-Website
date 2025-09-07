const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  completedTasks: [
    {
      task: { type: mongoose.Schema.Types.ObjectId, ref: "KindnessAct" },
      date: { type: Date, default: Date.now }
    }
  ],
  streak: { type: Number, default: 0 },
  lastCompletedDate: { type: Date },
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "KindnessAct",
    },
  ],
});

module.exports = mongoose.model('User', userSchema);
