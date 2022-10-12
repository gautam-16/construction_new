const {roleCreate,statusCreate} = require("../controller/fixed_table.controller");
const express  =  require('express');
const router = express.Router();

router.route('/createRole').post(roleCreate);
router.route('/createStatus').post(statusCreate);

module.exports = router;