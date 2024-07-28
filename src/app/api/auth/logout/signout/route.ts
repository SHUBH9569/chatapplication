import { connectToDB } from "@/mongoDb/index";
import User from "@/models/User";
import { NextRequest,NextResponse } from "next/server";

export const POST = async (req : NextRequest) => {
    try {
        console.log("trying to connect to db....");
        
        await connectToDB()
        console.log("connected to db...");
        
        const body =await req.json()
        const {email} = body;
        console.log("email is ",email);
        

        let existingUser = await User.findOne({ email:email });
        if(existingUser && existingUser.isactive){
            console.log("the existing user ",existingUser);
            
            existingUser = await User.findByIdAndUpdate(existingUser._id, { email, isactive: false }, { new: true });
           
            return new NextResponse(JSON.stringify(existingUser), { status: 200 });
        }
        console.log("no existing user");
        return new NextResponse("no existing user in db",{
            status:400
        })
        
        

    } catch (error) {
        console.error("Error:", error);
        return new NextResponse("Failed to logout", {
          status: 500,
        });
      }
} 