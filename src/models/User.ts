import mongoose from "mongoose";
const Schema = mongoose.Schema;
const UserSchema = new Schema({

    name:{
        type:String,
        default:"",
        required:true
    },
    email:{
        type:String,
        default:"",
        unique:true,
        required:true
    },
    isactive:{
        type:Boolean,
        default:false,
    },
    ProfileImage:{
        type:String,
        default:""  
    },
    chats: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Chat" }],
      default: [],
    }
})
export default mongoose.models.User || mongoose.model("User",UserSchema);
