const express=require('express')
const router=express.Router()
const {isAuthenticated}=require('../middlewares/user.authentication')
const {createUser, readUser,readOneUser,updateOneUser
,deleteUser,loginUser,getRole,forgotPassword,
resetPassword,changePassword, getAllUserByDesignation,Updateowndetails}=require('../controller/user.controller')
router.route('/getRole').get(isAuthenticated,getRole)
router.route('/userCreate').post(createUser)
router.route('/loginUser').post(loginUser)
router.route('/readUser').get(isAuthenticated,readUser)
router.route('/readOneUser/:_id').get(isAuthenticated,readOneUser)
router.route('/updateOneUser/:_id').put(isAuthenticated,updateOneUser)
router.route('/deleteUser/:_id').delete(isAuthenticated,deleteUser)
router.route('/resetPassword').post(isAuthenticated,resetPassword)
router.route('/changepassword').put(isAuthenticated,changePassword)
router.route('/forgotPassword').post(forgotPassword)
router.route('/alluserbydesignation/:designation').get(getAllUserByDesignation)
router.route('/UpdateOwnDetails/:id').put(Updateowndetails)
module.exports=router;
