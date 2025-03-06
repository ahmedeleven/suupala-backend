import express from "express";
import {
  registerUser,
  loginUser,
  checkTokenValidity,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/checktoken", checkTokenValidity);

export default router;
