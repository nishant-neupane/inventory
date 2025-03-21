import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { Schema } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});

const UserModel = mongoose.models.User || mongoose.model("User", userSchema);

const connectMongoDB = async () => {
  try {
    if (mongoose.connection.readyState) return;
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "Inventory",
    });
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    throw new Error("MongoDB connection failed");
  }
};

export async function POST(request) {
  try {
    await connectMongoDB();
    const { name, email, password, confirmPassword } = await request.json();

    if (password !== confirmPassword) {
      console.error("Passwords do not match");
      return NextResponse.json({}, { status: 400 });
    }
    if (await UserModel.findOne({ email })) {
      console.error("Email is already registered");
      return NextResponse.json({}, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ name, email, password: hashedPassword });
    await newUser.save();
    // return NextResponse.redirect(new URL("/login", request.url));
    return NextResponse.json({}, { status: 201 });
  } catch (error) {
    console.error("Error storing user:", error);
    return NextResponse.json({}, { status: 500 });
  }
}
