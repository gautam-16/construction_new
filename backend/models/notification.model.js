const {Sequelize,DataTypes}=require('sequelize')
const sequelize=require('../server')

const createTableNotification= sequelize.define('Notification',{
  description:{
    type:Sequelize.STRING,
    required:[true,'cannot create notification without name']
  },
  senderid:{
  type:Sequelize.DataTypes.STRING,
  },
  recieverid:{
    type:Sequelize.STRING,
  },
 
},{
  freezeTableName: true
});
module.exports=createTableNotification;