import { NextResponse } from "next/server";
import connectMongoDB from "../../../lib/dbConnect";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});

const UserModel = mongoose.models.User || mongoose.model("User", userSchema);

export async function POST(req) {
  try {
    console.log("Request received");
    await connectMongoDB();
    console.log("Connected to MongoDB");

    const { email, password } = await req.json();
    console.log("Email:", email);
    console.log("Password:", password);

    if (!email || !password) {
      console.log("Missing fields");
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const user = await UserModel.findOne({ email });
    console.log("User found:", user);

    if (!user) {
      console.log("User not found");
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Compare passwords (This is just a simple example, not recommended for production)
    if (password !== user.password) {
      console.log("Password does not match");
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    return NextResponse.json({ message: "Login successful" });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
