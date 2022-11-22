const express=require('express')
const router=express.Router()
const {isAuthenticated}=require('../middlewares/user.authentication')
const {createTask,getAlltasks}=require('../controller/task.controller')

router.route('/createTask/:phaseid').post(isAuthenticated,createTask)
router.route('/getAllTasks/:phaseid').get(isAuthenticated,getAlltasks)
module.exports=router;
