const {Sequelize,DataTypes}=require('sequelize')
const sequelize=require('../server')

const Message= sequelize.define('Message',{
  senderid:{
  type:Sequelize.DataTypes.INTEGER,
  },
  recieverid:{
    type:Sequelize.DataTypes.INTEGER,
  },
  message:{
    type:Sequelize.DataTypes.TEXT,
    allowNull:false
  },
  metadata:{
    type:Sequelize.DataTypes.STRING
  }
},{
  freezeTableName: true
},{timestamps: false});
module.exports=Message;