import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("❌ MONGODB_URI is not defined in .env");
}

export const connectToDatabase = async () => {
  if (mongoose.connection.readyState >= 1) {
    console.log("✅ MongoDB already connected.");
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI, { dbName: "ai_vas" });
    console.log("✅ Successfully connected to MongoDB.");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1);
  }
};
