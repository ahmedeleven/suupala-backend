import express from "express";
import {
  profile,
  addItem,
  removeItem,
  listItems,
} from "../controllers/usersController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/user", authMiddleware, profile);
router.get("/user/items", authMiddleware, listItems);
router.post("/user/items", authMiddleware, addItem);
router.delete("/user/items", authMiddleware, removeItem);

export default router;
