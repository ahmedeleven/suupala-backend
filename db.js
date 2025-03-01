import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectPromise = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
  } catch (err) {
    throw err;
  }
};

const connectDB = () => {
  connectPromise()
    .then(() => {
      console.log(`Database Connected!`);
    })
    .catch((err) => {
      console.error(Error(`${err}`));
    });
};

//module.exports = connectDB;

export default connectDB;
