import mongoose, { Schema, Document, Model } from "mongoose";

// Define the IUser interface extending Mongoose's Document
export interface IUser extends Document {
  email: string;
  password: string;
  role: string;
}

// Define User Schema
const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" },
  },
  { collection: "users", timestamps: true } // Adds createdAt & updatedAt fields automatically
);

// Ensure model is not recompiled multiple times
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
