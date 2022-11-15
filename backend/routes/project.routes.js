const express=require('express')
const router=express.Router()
const {createProject, AssignUser, getallProjects,updateOneProject,
deleteOneProject,getOneProject,getdeployedUser, getallUsersOnproject,removeUserFromProject,getremovedUser,
}=require('../controller/project.controller')
const{isAuthenticated}=require('../middlewares/user.authentication')
router.route('/createProject').post(isAuthenticated,createProject)
router.route('/assignUser/:projectname').post(isAuthenticated,AssignUser)
router.route('/allproject').get(isAuthenticated,getallProjects)
router.route('/updateOneProject/:_id').put(isAuthenticated,updateOneProject)
router.route('/deleteOneProject/:_id').delete(isAuthenticated,deleteOneProject)
router.route('/getOneProject/:_id').get(isAuthenticated,getOneProject)
router.route('/allUsersOnproject/:projectname').get(isAuthenticated,getallUsersOnproject)
router.route('/deployedUser/:projectname').get(isAuthenticated,getdeployedUser)

// router.route('/deletedUserfromProject/:projectname').get(isAuthenticated,deletedUserfromProject)

router.route('/removedUser/:projectname').get(isAuthenticated,getremovedUser)
router.route('/removeUser/:projectname').delete(isAuthenticated,removeUserFromProject)
module.exports=router