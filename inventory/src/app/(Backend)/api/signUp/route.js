import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { Schema } from "mongoose";

const user = new Schema({
  name: String,
  email: String,
  password: String,
  confirmPassword: String,
});

const UserModel = mongoose.models.User || mongoose.model("User", user);

const connectMongoDB = async () => {
  try {
    if (mongoose.connections[0].readyState) {
      console.log("Already connected to MongoDB");
      return;
    }

    const mongoURI = process.env.MONGODB_URI;
    console.log("Attempting to connect to MongoDB...");

    mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "user_login",
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw new Error("MongoDB connection failed");
  }
};

export async function POST(request) {
  try {
    await connectMongoDB();
    const { name, email, password, confirmPassword } = await request.json();

    // Check if passwords match
    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: "Passwords do not match" },
        { status: 400 }
      );
    }

    // Create a new document and save it to the DB
    const newUser = new UserModel({ name, email, password, confirmPassword });
    await newUser.save();

    return NextResponse.json({ message: "User stored successfully" });
  } catch (error) {
    console.error("Error storing User:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
