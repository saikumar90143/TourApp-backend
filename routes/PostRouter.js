import express from 'express'
import postControllers from '../controllers/postcontrollers/PostController.js'
import VerifyToken from '../middleware/VerifyToken.js'


const router=express.Router()

// get all tours

router.get('/allposts',postControllers.GetTours)

// get single tour

router.get('/singletour/:id',postControllers.SingleTour)

// get tour by search

router.get('/search/',postControllers.SearchByTilte)

// search by tag

router.get('/searchtag/:tag',postControllers.SearchByTag)

// releated tour

router.post('/releatedtour',postControllers.ReleatedTours)

// create tour

router.post('/create',VerifyToken,postControllers.CreatePost)

// update tour

router.patch('/tour/:id',VerifyToken,postControllers.UpdateTour)

// delete tour

router.delete('/tour/:id',VerifyToken,postControllers.DeleteTour)

// like tour

router.patch('/tour/like/:id',VerifyToken,postControllers.LikeTour)



// user posts

router.get('/usertours/:id',VerifyToken,postControllers.UserTours)

export default router