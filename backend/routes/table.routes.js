const express=require('express')
const router=express.Router()
const {roleCreate,createAlltables,Insertapifeatures,Findallapifeatures}=require('../controller/table.controller')
router.route('/Alltables').post(createAlltables)
router.route('/createRole').post(roleCreate);
router.route('/insertapi').post(Insertapifeatures);
router.route('/findallapi').get(Findallapifeatures);



module.exports=router;
