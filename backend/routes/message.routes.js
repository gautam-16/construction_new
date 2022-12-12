const express=require('express')
const router=express.Router()
const {broadcastMessage,sendMessagetoAllusers, sendMessagetoUser}=require('../controller/message.controller')
const{isAuthenticated}=require('../middlewares/user.authentication')
router.route('/broadcastforproject/:value').post(isAuthenticated,broadcastMessage)
router.route('/broadcastall').post(isAuthenticated,sendMessagetoAllusers)
router.route('/sendmessage/:projectname').post(isAuthenticated,sendMessagetoUser)
module.exports=router

    