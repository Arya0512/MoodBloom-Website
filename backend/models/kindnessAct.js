const mongoose = require("mongoose");

const KindnessActSchema = new mongoose.Schema({
  text: { type: String, required: true },
  category: { type: String, default: "general" },
  mood: { 
    type: String, 
    enum: ["happy", "sad", "stressed", "angry", "neutral"], 
    default: "neutral" 
  }
}, { timestamps: true });

module.exports = mongoose.model("KindnessAct", KindnessActSchema);

