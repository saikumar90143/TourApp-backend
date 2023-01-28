import mongoose from 'mongoose'

const PostSchema=mongoose.Schema({
       title:{
        type:String
       },
       description:{
        type:String
       },
       name:{
        type:String
       },
       creator:{
        type:String
       },
       tags:[String],
       selectfile:{
              type:String
       },
       likes:{
              type:[String],
              default:[]
       }

},{timestamps:true})

const Postmodel=mongoose.model("posts",PostSchema)

export default Postmodel