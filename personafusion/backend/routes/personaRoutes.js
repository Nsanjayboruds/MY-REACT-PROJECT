const express = require("express");
const router = express.Router();
const Persona = require("../models/Persona");

// GET /api/personas
router.get("/", async (req, res) => {
  try {
    const personas = await Persona.find();
    res.json(personas);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch personas" });
  }
});

module.exports = router;
