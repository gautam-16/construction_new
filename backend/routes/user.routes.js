const express=require('express')
const router=express.Router()
const {isAuthenticated}=require('../middlewares/user.authentication')
const {createUser,readAllUsers,readOneUser,updateOneUser
,deleteUser,loginUser,getRole,forgotPassword,
resetPassword,changePassword, getAllUserByDesignation,Updateowndetails}=require('../controller/user.controller')
router.route('/getRole').get(isAuthenticated,getRole)
router.route('/userCreate').post(isAuthenticated,createUser)
router.route('/loginUser').post(loginUser)
router.route('/readallusers').get(readAllUsers)
router.route('/readOneUser/:_id').get(isAuthenticated,readOneUser)
router.route('/updateOneUser/:_id').patch(isAuthenticated,updateOneUser)
router.route('/deleteUser/:_id').patch(isAuthenticated,deleteUser)
router.route('/resetPassword').post(isAuthenticated,resetPassword)
router.route('/changepassword').patch(isAuthenticated,changePassword)
router.route('/forgotPassword').post(forgotPassword)
router.route('/UpdateOwnDetails/:id').put(isAuthenticated,Updateowndetails)
module.exports=router;
