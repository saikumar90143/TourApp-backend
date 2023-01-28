import UserModel from "../../model/UserModel.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// signup

export const SignUp=async(req,res)=>{
    const {firstname,lastname,email,password,conformpassword}=req.body
      try {
         const existUser=await UserModel.findOne({email})
         if(existUser){
          
          return res.status(400).json({message:"email already exists"})
         }
         if(password!==conformpassword){
          
          return res.status(404).json({message:"please enter password correctly"})
         }
         
         const hashPassword=await bcrypt.hash(password,12)
         const result =await  UserModel.create({name:`${firstname} ${lastname}`,email,password:hashPassword})
     
         const token= jwt.sign({email:result.email,id:result._id},process.env.SECURE_KEY,{expiresIn:"1hr"})
         res.status(200).json({result,token})
      } catch (error) {
           res.status(404).json({message:"something wrong"})
           console.log(error.message)
      } 
}

export const SignIn=async(req,res)=>{
         const {email,password}=req.body
    try {
         const user=await UserModel.findOne({email})
         if(!user)return res.status(404).json({message:"user not exixts"})
         const isPassword=await bcrypt.compare(password,user.password)
         if(!isPassword)return res.status(400).json({message:"invalid creditionals"})
         const token = jwt.sign({email:user.email,id:user._id},process.env.SECURE_KEY,{expiresIn:"1hr"})
         res.status(200).json({result:user,token})
    } catch (error) {
         res.status(400).json({message:"wrong input feilds"})
         console.log(error)
    }
}

// googlesign 

export const GoogleSignIn=async(req,res)=>{
     const {email,name,token,googleid,image}=req.body
    try {
         const olduser=await UserModel.findOne({email})
         if(olduser){
        
          res.status(200).json({result:olduser,token})
         }else{
          const result=await UserModel.create({
               email,name,googleid,image
          })
          res.status(200).json({result,token})
         }
    } catch (error) {
        res.status(400).json({message:"some thing wrong"})
    }
} 