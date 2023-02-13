const express=require('express')
const router=express.Router()
const {createRole,findRole,updateRole,removeRolePermissions}=require('../controller/role.controller')
const{isAuthenticated}=require('../middlewares/user.authentication')
router.route('/createrole').post(createRole)
router.route('/readrole').get(findRole)
router.route('/updaterole').patch(updateRole)
router.route('/removerolepermissions').patch(removeRolePermissions)

module.exports=router

    