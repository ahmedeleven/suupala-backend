import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./db.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/userRoutes.js";
import recipeRoutes from "./routes/recipeRoutes.js";
import cors from "cors";

const app = express();

dotenv.config();

const port = process.env.PORT;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to Suupala!\n");
});

app.use(cors());

// Connect to the database
connectDB();

app.use("/api/auth", authRoutes);
app.use("/api", userRoutes);
app.use("/api", recipeRoutes);

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
