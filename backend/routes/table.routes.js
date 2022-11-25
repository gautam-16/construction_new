const express=require('express')
const router=express.Router()
const {roleCreate,} = require("../controller/table.controller");
const {createAlltables}=require('../controller/table.controller')
router.route('/Alltables').post(createAlltables)
router.route('/createRole').post(roleCreate);

module.exports=router;
