import express from 'express'
import { SignUp,SignIn,GoogleSignIn } from "../controllers/userControllers/AuthController.js";

const router=express.Router()


// sign up

router.post('/signup',SignUp)

// sign In

router.post('/signin',SignIn)

// googlesign

router.post('/googlesignin',GoogleSignIn)


export default router