import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL as string);
    console.log("Connected with MongoDB");
  } catch (error) {
    console.error("Error with MongoDB:", error);
    process.exit(1);
  }
};

export default connectDB;
