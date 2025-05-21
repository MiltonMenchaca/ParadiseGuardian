import express from "express";
import { register, login, refreshUserToken } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh-token", refreshUserToken);

export default router;
