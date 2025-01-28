
import dotenv from "dotenv";
import { registerUser, authenticateUser } from "../services/authService.js";

dotenv.config(); // Cargar variables de entorno

// Registro de Usuario
export const register = async (req, res) => {
  const { email, password } = req.body;

  try {
    const newUser = await registerUser(email, password);
    res.status(201).json({ message: "Usuario registrado con éxito", user: newUser });
  } catch (error) {
    console.error("Error en registro:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Inicio de Sesión
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { accessToken, refreshToken } = await authenticateUser(email, password);
    res.json({ message: "Login exitoso", accessToken, refreshToken });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
