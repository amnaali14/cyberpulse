import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(request) {
    console.log("🔵 [LOGIN API] Received POST request");

    try {
        if (request.method !== "POST") {
            console.warn("⚠️ [LOGIN API] Invalid request method:", request.method);
            return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
        }

        const { username, password } = await request.json();
        console.log("📩 [LOGIN API] Received Data:", { username });

        // Ensure MongoDB is connected
        await connectToDatabase();
        console.log("✅ [LOGIN API] Connected to MongoDB");

        // Find user in database
        const user = await User.findOne({ email: username });

        if (!user) {
            console.warn("❌ [LOGIN API] User not found:", username);
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.warn("⚠️ [LOGIN API] Invalid password attempt for:", username);
            return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });
        }

        // Generate JWT
        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        console.log("✅ [LOGIN API] Login successful for:", username);
        return NextResponse.json({ token }, { status: 200 });
    } catch (error) {
        console.error("🔥 [LOGIN API] Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
