
import dotenv from "dotenv";
import { registerUser, authenticateUser, verifyRefreshToken } from "../services/authService.js";
import jwt from "jsonwebtoken";

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
    res.status(401).json({ error: "Credenciales inválidas" });
  }
};

// Renovar Token de Acceso
export const refreshUserToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ error: "Refresh token no proporcionado" });
  }

  try {
    // Verificar el refresh token
    const userId = await verifyRefreshToken(refreshToken);
    
    if (!userId) {
      return res.status(403).json({ error: "Refresh token inválido o expirado" });
    }
    
    // Generar nuevo token de acceso
    const accessToken = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "15m" });
    
    res.json({ accessToken });
  } catch (error) {
    console.error("Error al renovar token:", error);
    res.status(403).json({ error: "No se pudo renovar el token" });
  }
};
