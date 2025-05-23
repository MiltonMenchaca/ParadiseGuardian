import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

const generateAccessToken = (user) => {
    return jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "15m" });
};

const generateRefreshToken = (user) => {
    return jwt.sign({ id: user.id }, process.env.REFRESH_SECRET, { expiresIn: "7d" });
};

export const registerUser = async (email, password) => {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) throw new Error("El usuario ya está registrado.");

    const hashedPassword = await bcrypt.hash(password, 10);
    return await User.create({ email, password: hashedPassword });
};

export const authenticateUser = async (email, password) => {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error("Usuario no encontrado");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Contraseña incorrecta");

    return {
        accessToken: generateAccessToken(user),
        refreshToken: generateRefreshToken(user)
    };
};

export const verifyRefreshToken = async (refreshToken) => {
    try {
        // Verificar la validez del refresh token
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
        
        // Verificar que el usuario existe en la base de datos
        const user = await User.findByPk(decoded.id);
        if (!user) {
            throw new Error("Usuario no encontrado");
        }
        
        return user.id;
    } catch (error) {
        console.error("Error al verificar refresh token:", error);
        return null;
    }
};
