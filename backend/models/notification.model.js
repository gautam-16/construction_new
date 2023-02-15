const {Sequelize,DataTypes}=require('sequelize')
const sequelize=require('../server')

const Notification= sequelize.define('Notification',{
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
  metadata:{
    type:Sequelize.DataTypes.STRING
  }
},{
  freezeTableName: true
},{timestamps: false});
module.exports=Notification;