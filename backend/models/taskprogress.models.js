const {Sequelize,DataTypes}=require('sequelize')
const sequelize=require('../server')

const TaskProgress= sequelize.define('TaskProgress',{
  progress:{
    type:Sequelize.DataTypes.INTEGER,
  },
  taskid:{
    type:Sequelize.DataTypes.INTEGER,
    allowNull:false
  },
  metadata:{
    type:Sequelize.DataTypes.STRING
  }

},{
  freezeTableName: true
});
module.exports=TaskProgress;