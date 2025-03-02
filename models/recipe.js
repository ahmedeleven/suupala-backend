import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  ingredients: [{ type: String }],
  instructions: [{ type: String }],
  difficulty: { type: String },
  prepTime: { type: String },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  public: { type: Boolean, default: false },
});

const Recipe = mongoose.model("Recipe", recipeSchema);

export default Recipe;
