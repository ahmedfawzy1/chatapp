import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const connections = await mongoose.connect(process.env.MONGODB_URL);
    console.log(`MongoDB connected: ${connections.connection.host}`);
  } catch (error) {
    console.log(`MongoDB connection error: ${error}`);
  }
};
