const {roleCreate,statusCreate} = require("../controller/fixed_table.controller");
const {isAuthenticated}=require('../middlewares/user.authentication')
const express  =  require('express');
const router = express.Router();

router.route('/createRole').post(isAuthenticated,roleCreate);
router.route('/createStatus').post(statusCreate);

module.exports = router;