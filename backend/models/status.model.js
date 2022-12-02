const {Sequelize,DataTypes}=require('sequelize')
const sequelize=require('../server')

const Status= sequelize.define('Status',{
  statusname:DataTypes.BLOB('long'),
    metadata:{
      type:Sequelize.DataTypes.STRING
    }
},{
  freezeTableName: true
});
module.exports= Status;