const mongoose = require("mongoose");

const personaSchema = new mongoose.Schema({
  name: String,
  tone: String,
  backstory: String,
  avatarUrl: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Persona", personaSchema);
