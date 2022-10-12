const {roleCreate} = require("../controller/role.controller");
const express  =  require('express');
const router = express.Router();

router.route('/createRole').post(roleCreate);

module.exports = router;