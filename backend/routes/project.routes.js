const express=require('express')
const router=express.Router()
const {createProject, AssignUser, getallProject}=require('../controller/project.controller')
const{isAuthenticated}=require('../middlewares/user.authentication')
router.route('/createProject').post(isAuthenticated,createProject)
router.route('/assignUser').post(isAuthenticated,AssignUser)
router.route('/allproject').get(isAuthenticated,getallProject)


module.exports=router;