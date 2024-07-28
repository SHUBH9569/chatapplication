
import User from "@/models/User";
import { connectToDB } from "@/mongoDb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectToDB();
    const body = await req.json();
    const { email, name, ProfileImage } = body;

    if (!email) {
      console.log("Email not present");
      return NextResponse.json({ message: 'Email is required' }, { status: 400 });
    }

    const user = await User.findOne({ email });

    if (!user) {
      console.log("User not found");
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    if (name) user.name = name;
    if (ProfileImage) user.ProfileImage = ProfileImage;

    await user.save();
    
    console.log("Profile updated successfully");
    return NextResponse.json({ message: 'Profile updated successfully', user }, { status: 200 });
  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
