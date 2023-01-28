
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'
// user router
import userRouter from './routes/AuthRouter.js'
import PostRouter from './routes/PostRouter.js'
dotenv.config()


// port
const PORT=process.env.PORT || 8080

const app=express()
// middlewares
app.use(morgan('dev'))
app.use(express.json({limit:'30mb',extended:true}))
app.use(express.urlencoded({limit:"30mb",extended:true}))
app.use(cors())



// users
app.use('/users/',userRouter)

// posts
app.use('/api/posts/',PostRouter)


mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
    app.listen(PORT,()=>{
        console.log("server is connected to", PORT)
    })
}).catch((error)=>{
   console.log("something wrong",error)
})

