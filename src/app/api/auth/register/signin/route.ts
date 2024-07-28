import { connectToDB } from "@/mongoDb/index";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    await connectToDB();
    console.log("Connected to database");

    
    const body = await req.json();
    console.log("Request body:", body);

    const { name, email } = body;

    
    console.log("Checking for existing user...");
    let existingUser = await User.findOne({ email:email });
    if (existingUser) {
      existingUser = await User.findByIdAndUpdate(existingUser._id, { name, isactive: true }, { new: true });
      console.log("User already exists");
      
      return new NextResponse(JSON.stringify(existingUser), { status: 200 });
    }
    
    console.log("Creating new user...");
    const newUser = new User({
      name: name,
      email: email,
      isactive: true,
    });

    await newUser.save();
    console.log("New user created:", newUser);

    return new NextResponse(JSON.stringify(newUser), { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return new NextResponse("Failed to create new user", {
      status: 500,
    });
  }
};
