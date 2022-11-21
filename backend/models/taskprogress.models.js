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
  taskstatus:{
    type:Sequelize.DataTypes.STRING,
    allowNull:false,
    defaultValue:'incomplete'
  }
},{
  freezeTableName: true
});
module.exports=TaskProgress;