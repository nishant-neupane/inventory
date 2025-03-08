// app/api/store-data/route.js

import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { Schema } from "mongoose";

// Example Schema (change as per your needs)
const dataSchema = new Schema({
  name: String,
  description: String,
  price: Number,
});

const DataModel = mongoose.models.Data || mongoose.model("Data", dataSchema);

const connectMongoDB = async () => {
  try {
    if (mongoose.connections[0].readyState) {
      console.log("Already connected to MongoDB");
      return;
    }

    const mongoURI =
      process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/inventory";
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
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
    const { name, description, price } = await request.json();

    // Create a new document and save it to the DB
    const newData = new DataModel({ name, description, price });
    console.log(newData);
    await newData.save();

    return NextResponse.json({ message: "Data stored successfully" });
  } catch (error) {
    console.error("Error storing data:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
