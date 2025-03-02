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

export const addItem = async (req, res) => {
  try {
    const userId = req.user; // get the current authenticated user
    const newItem = req.body.item;

    const user = await User.findById(userId);

    // check if item already exists in the items list for the current user
    if (user.items.includes(newItem)) {
      return res
        .status(400)
        .json({ message: "Item already exists in the items list" });
    }

    await User.findByIdAndUpdate(userId, { $push: { items: newItem } });
    res.status(200).json({ message: `${newItem} added successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const removeItem = async (req, res) => {
  try {
    const userId = req.user; // get current authenticated user
    const itemToRemove = req.body.item;

    await User.findByIdAndUpdate(userId, { $pull: { items: itemToRemove } });
    res.status(200).json({ message: `${itemToRemove} removed successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const listItems = async (req, res) => {
  try {
    const userId = req.user; // get current authenticated user
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    res.status(200).json(user.items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
