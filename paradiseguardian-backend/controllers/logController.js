import Log from "../models/Logs.js";
import { sendLogToClients } from "../server.js";

export const createLog = async (req, res) => {
  try {
    const { source, severity, message } = req.body;
    const log = await Log.create({ source, severity, message });

    sendLogToClients(log); // Enviar log a los clientes en tiempo real
    res.status(201).json(log);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
