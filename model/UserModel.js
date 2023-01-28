import mongoose from "mongoose";

const UserSchema= mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:false
    },
    image:{
        type:String
    },
    googleid:{
        type:String,
        required:false
    },
    id:{
        type:String,
    }

})

export default mongoose.model("usermodel",UserSchema)

