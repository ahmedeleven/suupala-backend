import express from "express";
import { profile } from "../controllers/usersController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/profile", authMiddleware, profile);

export default router;
