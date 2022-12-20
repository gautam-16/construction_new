const express=require('express')
const router=express.Router()
const {createPhase,getallPhaseonProject, getOnePhaseonProject, updateOnePhase, deleteOnePhase,
     assignUserOnPhase,getallEmployeesonPhase,reassignUserOnPhase,
     getemployeesdeployedonPhase,getemployeesremovedfromPhase,deleteUserFromPhase, getremovedPhaseonProject}=require('../controller/phase.controller')
const{isAuthenticated}=require('../middlewares/user.authentication')


router.route('/createPhase/:projectname').post(isAuthenticated,createPhase)
router.route('/getAllphases/:projectname').get(getallPhaseonProject)

router.route('/getremovedphases/:projectname').get(getremovedPhaseonProject)
router.route('/getOnePhaseonProject').get(getOnePhaseonProject)
router.route('/updateOnePhase/:_id').put(isAuthenticated,updateOnePhase)
router.route('/deleteOnePhase/:_id').delete(isAuthenticated,deleteOnePhase)
router.route('/assignUser/:phaseid').post(isAuthenticated,assignUserOnPhase)
router.route('/allEmployeesOnPhase/:phaseid').get(isAuthenticated,getallEmployeesonPhase)
router.route('/deployedEmployeesonPhase/:phaseid').get(isAuthenticated,getemployeesdeployedonPhase)
router.route('/removedEmployeesonPhase/:phaseid').get(isAuthenticated,getemployeesremovedfromPhase)
router.route('/deleteEmployeesonPhase/:phaseid').put(isAuthenticated,deleteUserFromPhase)
router.route('/reassignUser/:phaseid').put(isAuthenticated,reassignUserOnPhase)
module.exports=router

