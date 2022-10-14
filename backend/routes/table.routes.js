const express=require('express')
const router=express.Router()
const {createTableEmployeesOnProject,createTableImages,createTableNotification,createTablePhase,
createProjectTable,createTableProjectProgress,createTableRole,createTableStatus,
createTableTask,createTableUser,createTablechangelogUser}=require('../controller/table.controller')
router.route('/EOPTable').post(createTableEmployeesOnProject)
router.route('/imagesTable').post(createTableImages)
router.route('/notificationTable').post(createTableNotification)
router.route('/phaseTable').post(createTablePhase)
router.route('/projectTable').post(createProjectTable)
router.route('/PPTable').post(createTableProjectProgress)
router.route('/roleTable').post(createTableRole)
router.route('/statusTable').post(createTableStatus)
router.route('/taskTable').post(createTableTask)
router.route('/userTable').post(createTableUser)
router.route('/CLuser').post(createTablechangelogUser)

module.exports=router;
