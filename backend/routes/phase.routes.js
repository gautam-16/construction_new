const express=require('express')
const router=express.Router()
const {createPhase,getallPhaseonProject, getOnePhaseonProject, updateOnePhase, deleteOnePhase, assignUserOnPhase}=require('../controller/phase.controller')
const{isAuthenticated}=require('../middlewares/user.authentication')


router.route('/createPhase/:projectname').post(isAuthenticated,createPhase)
router.route('/getAllphases/:projectname').get(getallPhaseonProject)
router.route('/getOnePhaseonProject/:projectname').get(getOnePhaseonProject)
router.route('/updateOnePhase/:_id').put(isAuthenticated,updateOnePhase)
router.route('/deleteOnePhase/:_id').delete(isAuthenticated,deleteOnePhase)
router.route('/assignUser/:id').post(isAuthenticated,assignUserOnPhase)
module.exports=router

