import User from "../models/user.js";

export const profile = async (req, res) => {
  try {
    const userId = req.user; // get the current authenticated userId (added to the req by authMiddleware)
    const user = await User.findOne({ _id: userId }); // get user details
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
