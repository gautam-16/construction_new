const express=require('express')
const router=express.Router()
const {createProject, AssignUser, getallProjects,updateOneProject,deleteOneProject}=require('../controller/project.controller')
const{isAuthenticated}=require('../middlewares/user.authentication')
router.route('/createProject').post(isAuthenticated,createProject)
router.route('/assignUser').post(isAuthenticated,AssignUser)
router.route('/allproject').get(isAuthenticated,getallProjects)
router.route('/updateOneProject/:_id').put(isAuthenticated,updateOneProject)
router.route('/deleteOneProject/:_id').delete(isAuthenticated,deleteOneProject)

module.exports=router;