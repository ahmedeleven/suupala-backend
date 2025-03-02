import express from "express";
import { generateRecipe } from "../controllers/recipesController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/recipes/generate", authMiddleware, generateRecipe);

export default router;
