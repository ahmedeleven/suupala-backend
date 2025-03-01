import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register a new user and return the new User
export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // check if the username or email exists
    const isUser = await User.findOne({ $or: [{ username }, { email }] });
    if (isUser) {
      return res
        .status(400)
        .json({ message: "username or email already exists!" });
    }

    // encrypt the password sent from the user
    const hashedPassword = await bcrypt.hash(password, 10);

    // create a new user
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res
      .status(201)
      .json({ message: `User registered successfully ${newUser}` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Login logic
export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Get the user using the username
    const user = await User.findOne({ username });
    console.log(user);

    // If user not found in the database
    if (!user) {
      return res
        .status(401)
        .json({ message: "Username or Password is not correct" });
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(401).json({ message: "Username of Password is not correct" });
    }

    // Generate token for the user
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
