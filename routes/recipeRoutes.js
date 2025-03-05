import express from "express";
import {
  addRecipe,
  generateRecipe,
  getUserRecipes,
} from "../controllers/recipesController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/recipes/generate", authMiddleware, generateRecipe);
router.post("/recipes", authMiddleware, addRecipe);
router.get("/recipes/user", authMiddleware, getUserRecipes);

export default router;
