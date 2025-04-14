import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Sequelize } from "sequelize";
import authRoutes from "./routes/authRoutes.js";
import logRoutes from "./routes/logRoutes.js";
import { Server } from "socket.io";
import http from "http";
import errorHandler from "./middlewares/errorHandler.js";

dotenv.config();

const app = express();
app.use(errorHandler);
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());

// Conexión a PostgreSQL con Sequelize
const sequelize = new Sequelize(process.env.DB_URL, {
  dialect: "postgres",
  logging: false,
});

sequelize.authenticate()
  .then(() => console.log("Base de datos conectada"))
  .catch(err => console.error("Error al conectar DB:", err));

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/logs", logRoutes);

// WebSockets para logs en tiempo real
io.on("connection", (socket) => {
  console.log("🔗 Cliente conectado");

  socket.on("disconnect", () => {
    console.log("❌ Cliente desconectado");
  });
});

export const sendLogToClients = (log) => {
  io.emit("newLog", log);
};

app.get("/", (req, res) => {
  res.send("Servidor corriendo...");
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
