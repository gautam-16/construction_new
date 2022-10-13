const {Sequelize,DataTypes}=require('sequelize')
const sequelize=require('../server')

const createTableNotification= sequelize.define('Notification',{
  description:{
    type:Sequelize.STRING,
    allowNull:false
  },
  senderid:{
  type:Sequelize.DataTypes.INTEGER,
  },
  recieverid:{
    type:Sequelize.DataTypes.INTEGER,
  },
},{
  freezeTableName: true
});
module.exports=createTableNotification;