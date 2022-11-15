const express=require('express')
const router=express.Router()
const {createPhase}=require('../controller/phase.controller')
const{isAuthenticated}=require('../middlewares/user.authentication')


router.route('/createPhase').post(isAuthenticated,createPhase)


module.exports=router

