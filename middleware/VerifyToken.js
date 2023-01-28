import jwt from 'jsonwebtoken'
import UserModel from '../model/UserModel.js'

const VerifyToken=async(req,res,next)=>{
    try {
        const token=req.headers.authorization.split(' ')[1]
         
        const isCustomAuth=token.length <500;
        let decodedData;
        if(token && isCustomAuth){
           decodedData=jwt.verify(token,process.env.SECURE_KEY)
           req.userId=decodedData?.id
        }else{
             decodedData=jwt.decode(token)
             const googleid=decodedData?.sub.toString()
             const user=await UserModel.findOne({googleid})
             req.userId=user?._id
        }
        next()
    } catch (error) {
         console.log(error)
    }
  
}

export default VerifyToken