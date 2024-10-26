import mongoose from "mongoose";
import { mongoURI } from "../config";

export const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("🗄️ Connected to MongoDB");
  } catch (err) {
    console.error("🗄️ Error connecting to MongoDB", err);
    process.exit(1);
  }
};
