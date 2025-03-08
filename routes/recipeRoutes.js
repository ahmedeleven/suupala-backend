import express from "express";
import {
  addRecipe,
  generateRecipe,
  getUserRecipes,
  getRecipeDetails,
  deleteRecipe,
} from "../controllers/recipesController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/recipes/generate", authMiddleware, generateRecipe);
router.post("/recipes", authMiddleware, addRecipe);
router.get("/user/recipes", authMiddleware, getUserRecipes);
router.get("/user/recipes/:id", authMiddleware, getRecipeDetails);
router.delete("/user/recipes/:id", authMiddleware, deleteRecipe);

export default router;
