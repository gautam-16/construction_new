const express=require('express')
const router=express.Router()
const {createPhase,getallPhaseonProject, getOnePhaseonProject}=require('../controller/phase.controller')
const{isAuthenticated}=require('../middlewares/user.authentication')


router.route('/createPhase/:projectname').post(isAuthenticated,createPhase)
router.route('/getAllphases/:projectname').get(getallPhaseonProject)
router.route('/getOnePhaseonProject/:projectname').get(getOnePhaseonProject)

module.exports=router

