const express=require('express')
const router=express.Router()
const {createPhase,getallPhaseonProject, getOnePhaseonProject, updateOnePhase, deleteOnePhase}=require('../controller/phase.controller')
const{isAuthenticated}=require('../middlewares/user.authentication')


router.route('/createPhase/:projectname').post(isAuthenticated,createPhase)
router.route('/getAllphases/:projectname').get(getallPhaseonProject)
router.route('/getOnePhaseonProject/:projectname').get(getOnePhaseonProject)
router.route('/updateOnePhase/:_id').put(isAuthenticated,updateOnePhase)
router.route('/deleteOnePhase/:_id').delete(isAuthenticated,deleteOnePhase)
router.route('/allEmployeesOnPhase/:phasename').get(isAuthenticated,getallEmployeesonPhase)
router.route('/deployedEmployeesOnPhase/:phasename').get(isAuthenticated,getemployeesdeployedonPhase)
router.route('/removedEmployeesOnPhase/:phasename').get(isAuthenticated,getemployeesremovedfromPhase)
router.route('/deleteEmployeeOnPhase/:phasename').put(isAuthenticated,deleteUserFromPhase)


module.exports=router

