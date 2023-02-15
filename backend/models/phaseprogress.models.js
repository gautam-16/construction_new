const {Sequelize,DataTypes}=require('sequelize')
const sequelize=require('../server')

const PhaseProgress= sequelize.define('PhaseProgress',{
  phaseid:{
    type:Sequelize.DataTypes.INTEGER,
    allowNull:false
  },
  phaseprogress:{
    type:Sequelize.DataTypes.INTEGER,

  },
  totaltasks:{
    type:Sequelize.DataTypes.INTEGER,
    allowNull:false,
    defaultValue:0
  },
  completedtasks:{
    type:Sequelize.DataTypes.INTEGER,
    defaultValue:0
  },
  metadata:{
    type:Sequelize.DataTypes.STRING
  }
},{
  freezeTableName: true
},);
module.exports=PhaseProgress;