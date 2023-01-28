import Postmodel from "../../model/PostModel.js";
import mongoose from "mongoose";
// createpost

const CreatePost=async(req,res)=>{
     const post=req.body
       try {
          const newTour=await new Postmodel({...post,creator:req.userId})
             await newTour.save()
             res.status(200).json(newTour)
       } catch (error) {
            res.status(404).json({message:"post not created"})
       }
}

// update tour

const UpdateTour=async(req,res)=>{
     const {id}=req.params
     try {
          const Update=await Postmodel.findByIdAndUpdate(id,{$set:req.body},{new:true})
          res.status(200).json(Update)
          
     } catch (error) {
            res.status(400).json({message:"somthing went wrong"})
     }
}

// delete tour

const DeleteTour=async(req,res)=>{
     const {id}=req.params
   try {
       if(!mongoose.Types.ObjectId.isValid(id)){
          return res.status(400).json({message:"no tour found on this id"})
       }
       await Postmodel.findByIdAndDelete(id)
       res.status(200).json({message:"tour deleted successfully"})
   } catch (error) {
     res.status(400).json({message:"somthing wrong"})
   }
}


// get all tours

const GetTours=async(req,res)=>{
     const {page}=req.query
     console.log('page: ', page);
    try {
        const limit=2
        const startIndex=(Number(page)-1) *limit
        const total=await Postmodel.countDocuments()
        const tours=await Postmodel.find().limit(limit).skip(startIndex)

        res.status(200).json({
          data:tours,
          currentPage:Number(page),
          
          numberOfPages:Math.ceil(total/limit)
        })

    } catch (error) {
         res.status(400).json({message:"np tours found"})
    }
}

// get single tour

const SingleTour=async(req,res)=>{
     
    try {
         const singleTour=await Postmodel.findById(req.params.id)
         res.status(200).json(singleTour)
    } catch (error) {
        res.status(400).json({message:"no tour found"})
    }
}

// user tours

const UserTours=async(req,res)=>{
     
     try {
         if(!mongoose.Types.ObjectId.isValid(req.params.id)){
         return  res.status(404).json({message:"no post found on this id"})
         }
         const UserTour=await Postmodel.find({creator:req.params.id})  

         res.status(200).json(UserTour)
         
     } catch (error) {
            res.status(404).json({message:"somthing wrong"})
     }
}

// search tour by title

const SearchByTilte=async(req,res)=>{
     const{searchQuery}=req.query
     const title=new RegExp(searchQuery,'i')
    try {
       const SearchTour=await Postmodel.find({title})
       res.status(200).json(SearchTour)
    } catch (error) {
       res.status(404).json({message:"something wrong"})
    }
}

// search by tag
const SearchByTag=async(req,res)=>{
     const{tag}=req.params
     
    try {
       const tour=await Postmodel.find({tags:{$in:tag}})
       res.status(200).json(tour)
    } catch (error) {
       res.status(404).json({message:"something wrong"})
    }
}

// related tours
const ReleatedTours=async(req,res)=>{
     const tags=req.body
     
    try {
       const tour=await Postmodel.find({tags:{$in:tags}})
       res.status(200).json(tour)
    } catch (error) {
       res.status(404).json({message:"something wrong"})
    }
}

// like tour

const LikeTour=async(req,res)=>{
     const{id}=req.params
     try {
         const tour=await Postmodel.findById(id)
        
         
         if(!tour.likes.includes(req.userId)){
          tour.likes.push(req.userId)
         }else{
           tour.likes.pull(req.userId)
         }

         const UpdateTour=await Postmodel.findByIdAndUpdate(id,tour,{new:true})
         res.status(200).json(UpdateTour)
     } catch (error) {
          res.status(404).json({message:error.message})
     }
}


const postControllers={CreatePost,GetTours,SingleTour,UserTours,UpdateTour,DeleteTour,SearchByTilte,SearchByTag,ReleatedTours,LikeTour}

export default postControllers