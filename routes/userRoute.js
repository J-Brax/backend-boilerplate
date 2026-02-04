import express from "express";
import { register, login, logout } from "../controllers/userController.js";
import { isAuthenticated, isAllowed } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", isAuthenticated, login);
router.post("/logout", logout);

router.post("/dashboard", isAllowed, (req, res) => {
  res.json({ message: "Welcome to the dashboard" });
});

export default router;
