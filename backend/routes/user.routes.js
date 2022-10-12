const express=require('express')
const router=express.Router()
const {createUser, readUser,readOneUser,updateUser,deleteUser,loginUser}=require('../controller/user.controller')
router.route('/userCreate').post(createUser)
router.route('/loginUser').get(loginUser)
router.route('/readUser').get(readUser)
router.route('/readOneUser').get(readOneUser)
router.route('/updateUser').put(updateUser)
router.route('/deleteUser').post(deleteUser)
// router.route('/roleTable').post(createRoleTable)
module.exports=router;

