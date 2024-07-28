import User from "@/models/User";
import { connectToDB } from "@/mongoDb";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    await connectToDB();
    const body = await req.json();
    const { email } = body;

    const profile = await User.findOne({ email });

    return NextResponse.json({ profile });
    
  } catch (error) {
    console.error("Error fetching profile:", error);
    return new NextResponse("Failed to fetch profile", { status: 500 });
  }
};
