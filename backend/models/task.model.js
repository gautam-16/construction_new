const {Sequelize,DataTypes}=require('sequelize')
const sequelize=require('../server')

const Task= sequelize.define('Task',{
  taskname:{
    type:Sequelize.STRING,
    allowNull:false
  },
  description:{
  type:Sequelize.DataTypes.TEXT,
  },
  taskassignedby:{
    type:Sequelize.DataTypes.INTEGER,
    required:true
  },
  taskassignedto:{
    type:Sequelize.DataTypes.INTEGER,
    required:true},
    metadata:{
      type:Sequelize.DataTypes.STRING
    },
    phaseid:{type:Sequelize.DataTypes.INTEGER},
    startdate:{
      type:Sequelize.Dataypes.DATEONLY
    },
    enddate:{type:Sequelize.Dataypes.DATEONLY},
    taskstatus:{
      type:Sequelize.DataTypes.STRING,
      allowNull:false,
      defaultValue:'incomplete'
    },
    isactive:{type:Sequelize.BOOLEAN},
},{
  freezeTableName: true
});
module.exports=Task;