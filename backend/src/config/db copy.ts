import mongoose from "mongoose";
import env from "./env";

const connectDB = async () => {
  try {
    await mongoose.connect(`${env.MONGODB_URI}/refer_credit`);
    console.log("Database Connected Succesfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
