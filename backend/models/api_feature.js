const {Sequelize,DataTypes}=require('sequelize')
const sequelize=require('../server')

const apifeature= sequelize.define('apifeature',{
    apiname:{
    type:Sequelize.STRING,
    allowNull:false,unique:true},
    api_status:{type:Sequelize.STRING},
    metadata:{
      type:Sequelize.DataTypes.STRING
    },
},{
  freezeTableName: true
},{timestamps: false});
module.exports=apifeature;