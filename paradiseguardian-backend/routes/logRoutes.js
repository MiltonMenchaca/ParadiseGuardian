import express from "express";
import Log from "../models/Log.js";

const router = express.Router();

// Guardar un nuevo log
router.post("/", async (req, res) => {
  try {
    const { source, severity, message } = req.body;
    const log = await Log.create({ source, severity, message });
    res.status(201).json(log);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener logs recientes
router.get("/", async (req, res) => {
  try {
    const logs = await Log.findAll({ order: [["timestamp", "DESC"]], limit: 50 });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
