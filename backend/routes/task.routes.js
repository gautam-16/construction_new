const express=require('express')
const router=express.Router()
const {isAuthenticated}=require('../middlewares/user.authentication')
const {createTask}=require('../controller/task.controller')

router.route('/createTask:/phaseid').post(isAuthenticated,createTask)
module.exports=router;
