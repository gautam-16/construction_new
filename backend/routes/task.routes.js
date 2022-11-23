const express=require('express')
const router=express.Router()
const {isAuthenticated}=require('../middlewares/user.authentication')
const {createTask,getAlltasks, updateTask, deleteTask, updatetaskprogress, getOneTask}=require('../controller/task.controller')

router.route('/createTask/:phaseid').post(isAuthenticated,createTask)
router.route('/getAllTasks/:phaseid').get(isAuthenticated,getAlltasks)
router.route('/getOneTask/:id').get(isAuthenticated,getOneTask)
router.route('/updateTask/:phaseid').put(isAuthenticated,updateTask)
router.route('/deleteTask/:phaseid').delete(isAuthenticated,deleteTask)
router.route('/updatetaskprogress/:phaseid').put(isAuthenticated,updatetaskprogress)
module.exports=router;
