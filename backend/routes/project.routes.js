const express=require('express')
const router=express.Router()
const {createProject}=require('../controller/project.controller')
const{isAuthenticated}=require('../middlewares/user.authentication')
router.route('/project').post(isAuthenticated,createProject)


module.exports=router;