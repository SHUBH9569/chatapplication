import Chat from "@/models/Chat";
import Message from "@/models/Message";
import User from "@/models/User";
import { connectToDB } from "@/mongoDb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectToDB();
    const body = await req.json();
    const { sessionEmail, contactId } = body;

    const hostuser = await User.findOne({ email: sessionEmail });
    const chat = await Chat.findOne({
      members: { $all: [hostuser._id, contactId] },
    });
    if(!chat){
        return  NextResponse.json({message: "Chat does not exist"},{status:403});
    }
    const messageId = chat.messages;
    
    const messages = await Message.find({ _id: { $in: messageId } });

    if(!messages){
        return NextResponse.json({message:"messages do not exist"},{status:403});

    }
    return NextResponse.json({messages},{status:200});
    
   
    
  } catch (error) {
    console.error("Error finding chat:", error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
