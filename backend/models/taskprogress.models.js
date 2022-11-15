const {Sequelize,DataTypes}=require('sequelize')
const sequelize=require('../server')

const TaskProgress= sequelize.define('TaskProgress',{
  progress:{
    type:Sequelize.DataTypes.INTEGER,
  },
  phaseid:{
    type:Sequelize.DataTypes.INTEGER,
    allowNull:false
  },
  taskid:{
    type:Sequelize.DataTypes.INTEGER,
    allowNull:false
  },
},{
  freezeTableName: true
});
module.exports=TaskProgress;