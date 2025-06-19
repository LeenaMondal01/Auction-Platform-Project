import express from "express";
import { fetchLeaderboard, forgotPassword, getProfile, login, logout, register, resetPassword, updatePassword } from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", isAuthenticated, getProfile);
router.get("/logout",isAuthenticated, logout);
router.get("/leaderboard", fetchLeaderboard);
router.put("/update/password",isAuthenticated,updatePassword);
router.post("/password/forgot", forgotPassword);
router.put("/password/reset/:token", resetPassword);

export default router;
