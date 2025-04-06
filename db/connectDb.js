// /db/connectDb.js
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("❌ MONGODB_URI is not defined in environment variables");
}

let isConnected = false; // Track connection status

const connectDB = async () => {
  if (isConnected) {
    // ✅ Already connected
    return;
  }

  try {
    const conn = await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ Database connection error:", error);
    throw new Error("MongoDB connection failed");
  }
};

export default connectDB;
