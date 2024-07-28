import Chat from "@/models/Chat";
import Message from "@/models/Message";
import User from "@/models/User";
import { connectToDB } from "@/mongoDb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectToDB();

        const body = await req.json();
        const { message, contactId, email } = body;

        
        const sender = await User.findOne({ email });
        if (!sender) {
            return NextResponse.json({ message: "Sender not found" }, { status: 404 });
        }

        
        let chat = await Chat.findOne({
            members: { $all: [contactId, sender._id] }
        });

        if (!chat) {
            chat = new Chat({
                members: [contactId, sender._id]
            });
            await chat.save();
        }

       
        const newMessage = new Message({
            text: message,
            sender: sender._id,
            chat: chat._id
        });
        await newMessage.save();

       
        chat.messages.push(newMessage._id);
        await chat.save();
        

        return NextResponse.json({ message: "Message added successfully", chat }, { status: 200 });
    } catch (error) {
        console.error('Error adding message:', error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
