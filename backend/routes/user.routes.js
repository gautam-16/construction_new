const express=require('express')
const router=express.Router()
const {createUser, readUser,readOneUser,updateUser,deleteUser}=require('../controller/user.controller')
router.route('/userCreate').post(createUser)
router.route('/readUser').get(readUser)
router.route('/readOneUser').get(readOneUser)
router.route('/updateUser').post(updateUser)
router.route('/deleteUser').post(deleteUser)
// router.route('/roleTable').post(createRoleTable)
module.exports=router;

