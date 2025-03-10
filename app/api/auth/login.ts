import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; 
import User from "@/models/User";
import { connectToDatabase } from "@/lib/mongodb";

const SECRET = process.env.JWT_SECRET || "supersecretkey";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, password } = req.body;

  await connectToDatabase();

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ userId: user._id, email: user.email }, SECRET, { expiresIn: "7d" });

  res.status(200).json({ token, message: "Login successful" });
}
