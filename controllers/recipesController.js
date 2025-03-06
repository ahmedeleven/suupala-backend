import { GoogleGenerativeAI } from "@google/generative-ai";
import User from "../models/user.js";
import Recipe from "../models/recipe.js";

/* Check if array items exist in another array
 * Used to check if items sent in the request exist in the use items list
 */
const hasAllItems = (fullArray, partArray) => {
  if (!Array.isArray(fullArray) || !Array.isArray(partArray)) {
    throw new Error("Both arguments must be arrays");
  }
  return partArray.every((ele) => fullArray.includes(ele));
};

export const generateRecipe = async (req, res) => {
  try {
    const userId = req.user; // Get current userId
    const user = await User.findById(userId);
    const items = req.body.items; // Get requested items
    const userItems = user.items; // Get current user items
    // Check if requested items array exist in the current user items array
    if (!hasAllItems(user.items, items)) {
      return res
        .status(400)
        .json({ message: "Some of the items do not exist in your fridge" });
    }
    const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAi.getGenerativeModel({ model: "gemini-2.0-flash-lite" });
    const prompt = `Generate a recipe using all or some of the items in the following array: ${items} \n
    return the response as the following JSON format (return only the JSON object without formatting):\n
    {
        "name": "Recipe name",
        "ingredients": ["Required ingredients"],
        "instructions": ["Step by step instructions"],
        "difficulty": "Easy/Medium/Hard",
        "prepTime": "Preparation time in minutes",
    }`;
    const result = await model.generateContent(prompt);
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const addRecipe = async (req, res) => {
  const { name, ingredients, instructions, difficulty, prepTime } = req.body;
  const userId = req.user;
  const newRecipe = new Recipe({
    name,
    ingredients,
    instructions,
    difficulty,
    prepTime,
    userId,
  });

  await newRecipe.save();

  res.status(201).json(newRecipe);
};

export const getUserRecipes = async (req, res) => {
  try {
    const userId = req.user;
    const recipes = await Recipe.find({ userId });
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
